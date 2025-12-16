const axios = require("axios");
const { Client } = require("pg");
const {
  BedrockRuntimeClient,
  InvokeModelCommand
} = require("@aws-sdk/client-bedrock-runtime");

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : event;
    const { resumeId } = body;

    if (!resumeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing resumeId" })
      };
    }

    const claims = event.requestContext?.authorizer?.jwt?.claims || {};
    const userSub = claims.sub || null;
    const userEmail = claims.email || null;

    // ===== DATABASE CONNECTION =====
    const client = new Client({
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    // ===== GET RESUME =====
    const resumeRes = await client.query(
      "SELECT full_text FROM resumes WHERE id = $1",
      [resumeId]
    );
    if (!resumeRes.rowCount) throw new Error("Resume not found");

    const resumeText = resumeRes.rows[0].full_text;

    // ===== FETCH FRESH JOBS FROM EXTERNAL API =====
    console.log("Fetching fresh jobs from JSearch API...");
    
    const RAPID_API_KEY = process.env.RAPID_API_KEY;
    if (!RAPID_API_KEY) {
      throw new Error("Missing RAPID_API_KEY environment variable");
    }

    // Multiple search queries to get variety of jobs
    const searchQueries = ["Cloud Engineer Toronto", "Software Developer"];
    
    let importedCount = 0;
    
    for (const query of searchQueries) {
      try {
        const jobsResponse = await axios.get("https://jsearch.p.rapidapi.com/search", {
          params: {
            query: query,
            page: "1",
            num_pages: "1"
          },
          headers: {
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
          },
          timeout: 10000
        });

        const jobs = jobsResponse.data.data || [];
        console.log(`Found ${jobs.length} jobs for query: ${query}`);

        // Insert jobs into database
        for (const job of jobs) {
          try {
            await client.query(
              `INSERT INTO jobs (title, company, location, description, url, source)
               VALUES ($1, $2, $3, $4, $5, 'rapidapi')
               ON CONFLICT DO NOTHING;`,
              [
                job.job_title || "Unknown Title",
                job.employer_name || "Unknown Company",
                job.job_city || "Unknown Location",
                job.job_description || "No description",
                job.job_apply_link || ""
              ]
            );
            importedCount++;
          } catch (dbErr) {
            console.warn("DB insert error:", dbErr.message);
          }
        }
      } catch (apiErr) {
        console.warn(`API error for query "${query}":`, apiErr.message);
      }
    }

    console.log(`Total jobs imported/updated: ${importedCount}`);

    // ===== GET ALL JOBS FROM DATABASE =====
    const jobsRes = await client.query("SELECT id, title, company, description, url FROM jobs LIMIT 10");
    const jobs = jobsRes.rows;

    if (jobs.length === 0) {
      await client.end();
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST,OPTIONS",
        },
        body: JSON.stringify({
          message: "No jobs available for matching",
          topMatches: [],
          allMatches: [],
          importedCount
        })
      };
    }

    console.log(`Matching resume against ${jobs.length} jobs...`);

    const resumeTextTrimmed = resumeText.slice(0, 3000);
    const matches = [];

    // ===== MATCH RESUME AGAINST EACH JOB =====
    for (const job of jobs) {
      try {
        const jobText = (job.description || "").slice(0, 1200);
        
        if (!jobText.trim()) {
          console.warn(`Job ${job.id} has no description, skipping`);
          continue;
        }

        const prompt = `
You are a job matching system. Analyze skill alignment.

CANDIDATE SKILLS (from resume):
${resumeTextTrimmed.substring(0, 800)}

JOB DESCRIPTION:
${jobText}

Provide:
1) Match percentage (0-100)
2) Brief reason

Output format:
MATCH_SCORE: <number>
REASON: <brief explanation>
`;

        const command = new InvokeModelCommand({
          modelId: "amazon.titan-text-lite-v1",
          contentType: "application/json",
          accept: "application/json",
          body: JSON.stringify({
            inputText: prompt,
            textGenerationConfig: {
              maxTokenCount: 300,
              temperature: 0.2,
              topP: 0.9
            }
          })
        });

        const response = await bedrock.send(command);
        const rawText = JSON.parse(
          new TextDecoder().decode(response.body)
        ).results[0].outputText;

        console.log(`AI output for job ${job.id}:`, rawText);

        // Parse score and reason
        let matchScore = 0;
        let summary = "Match analysis generated.";

        const scoreMatch = rawText.match(/(\d{1,3})\s*%?/);
        if (scoreMatch) {
          matchScore = Math.min(100, Number(scoreMatch[1]));
        }

        const reasonMatch = rawText.match(/Reason:\s*(.*)/i);
        if (reasonMatch) {
          summary = reasonMatch[1].trim().slice(0, 200);
        } else {
          summary = rawText.slice(0, 200);
        }

        // Save match to database
        let matchId = null;
        try {
          const insertRes = await client.query(
            `INSERT INTO resume_job_matches (resume_id, job_id, match_score)
             VALUES ($1, $2, $3)
             RETURNING id`,
            [resumeId, job.id, matchScore]
          );
          matchId = insertRes.rows[0].id;
        } catch (insertErr) {
          console.warn("Match insert error:", insertErr.message);
        }

        matches.push({
          jobId: job.id,
          matchId,
          title: job.title,
          company: job.company,
          url: job.url,
          match_score: matchScore,
          summary
        });

      } catch (matchErr) {
        console.error(`Error matching job ${job.id}:`, matchErr.message);
      }
    }

    // Sort by match score descending
    matches.sort((a, b) => b.match_score - a.match_score);
    const topMatches = matches.slice(0, 10); // Top 10

    await client.end();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        message: "Job matching completed",
        resumeId,
        importedCount,
        topMatches,
        allMatches: matches,
        userSub,
        userEmail
      })
    };

  } catch (err) {
    console.error("JOB MATCHING ERROR:", err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
      },
      body: JSON.stringify({
        error: "Job matching failed",
        details: err.message
      })
    };
  }
};
