import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader, User, Home, Target, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from "react-oidc-context";
import ThemeToggle from './components/Theme/ThemeToggle';
import EmptyState from './components/UI/EmptyState';
import LoadingSpinner from './components/UI/LoadingSpinner';
import MetricsCard from './components/Dashboard/MetricsCard';
import ActivityChart from './components/Dashboard/ActivityChart';
import SkillsChart from './components/Dashboard/SkillsChart';
import ScoreDistribution from './components/Dashboard/ScoreDistribution';
import RecentActivity from './components/Dashboard/RecentActivity';


export default function ResumeUploadApp({ onAccountClick }) {
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [matches, setMatches] = useState([]); // holds top job matches

  // ---- API ENDPOINTS ----
  const UPLOAD_URL =
    'https://uvrpukveqb.execute-api.us-east-1.amazonaws.com/dev/upload';

  const PARSE_RESUME_URL =
    'https://uvrpukveqb.execute-api.us-east-1.amazonaws.com/dev/parse-resume';

  const MATCH_ALL_URL =
    'https://uvrpukveqb.execute-api.us-east-1.amazonaws.com/dev/match-all';

  // ---- HELPERS TO CALL BACKEND ----

  async function parseResume(s3Key) {
    console.log('Calling parse-resume with s3Key:', s3Key);

    const res = await fetch(PARSE_RESUME_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user?.id_token}`
      },
      body: JSON.stringify({ s3Key }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'parse-resume failed');
    }

    return res.json(); // expected: { resumeId, ... }
  }

  async function matchAll(resumeId) {
    console.log('Calling match-all with resumeId:', resumeId);

    const res = await fetch(MATCH_ALL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user?.id_token}`
       },
      body: JSON.stringify({ resumeId }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'match-all failed');
    }

    return res.json(); // expected: { resumeId, topMatches, allMatches, ... }
  }

  // ---- FILE SELECTION ----
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setStatus('error');
      setMessage('Please upload only PDF or DOCX files');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setStatus('error');
      setMessage('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setStatus('idle');
    setMessage('');
    setProgress(0);
    setMatches([]); // reset matches when a new file is chosen
  };

  // ---- MAIN UPLOAD FUNCTION ----
  const handleUpload = async () => {
    if (!file) {
      setStatus('error');
      setMessage('Please select a file first');
      return;
    }


    setStatus('uploading');
    setProgress(0);
    setMessage('Requesting upload URL from server...');
    setMatches([]);

    try {
      // STEP 1: Ask Lambda for signed URL
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.id_token}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSizeBytes: file.size,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get upload URL');
      }

      const { uploadUrl, s3Key } = data;
      console.log('Upload Lambda returned:', data);

      // STEP 2: Upload file to S3
      setMessage('Uploading your resume to S3...');
      setProgress(40);

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      setProgress(60);
      setMessage('Resume uploaded. Parsing text with Lambda...');

      // STEP 3: Call parse-resume with s3Key
      const parseResult = await parseResume(s3Key);
      console.log('parse-resume result:', parseResult);

      const resumeId = parseResult.resumeId;
      if (!resumeId) {
        throw new Error('parse-resume did not return resumeId');
      }

      setProgress(75);
      setMessage('Resume parsed. Matching you to jobs...');

      // STEP 4: Call match-all with resumeId
      const matchResult = await matchAll(resumeId);
      console.log('match-all result:', matchResult);

      const topMatches = matchResult.topMatches || [];
      if (topMatches.length === 0) {
        setStatus('success');
        setProgress(100);
        setMessage('No job matches found yet. Try importing more jobs.');
        setMatches([]);
        return;
      }

      // Save all matches so we can render cards
      setMatches(topMatches);

      // Best match is the first
      const best = topMatches[0];

      // Normalize score: if 0–1, convert to %, else round
      let score = best.match_score;
      if (typeof score === 'number') {
        if (score <= 1) score = Math.round(score * 100);
        else score = Math.round(score);
      }

      setStatus('success');
      setProgress(100);
      setMessage(
        `Found ${topMatches.length} job matches.\nBest Match: ${best.title} — ${score}% match.\nSummary: ${best.summary}`
      );
    } catch (error) {
      console.error('Upload/match error:', error);
      setStatus('error');
      setMessage(error.message || 'Upload or matching failed. Please try again.');
      setProgress(0);
      setMatches([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Resume Job Matcher</div>
          <span className="text-slate-600 dark:text-gray-400">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <User size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700'}`} onClick={() => setActiveTab('dashboard')}>
              <Home size={20} />
              Dashboard
            </div>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${activeTab === 'analytics' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700'}`} onClick={() => setActiveTab('analytics')}>
              <BarChart3 size={20} />
              Analytics
            </div>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${activeTab === 'upload' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700'}`} onClick={() => setActiveTab('upload')}>
              <Upload size={20} />
              Upload Resume
            </div>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${activeTab === 'matches' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700'}`} onClick={() => setActiveTab('matches')}>
              <Target size={20} />
              My Matches
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all" onClick={onAccountClick}>
              <User size={20} />
              Account
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'upload' ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700">
              {/* File Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  file
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={status === 'uploading'}
                />

                {!file ? (
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
                      <Upload className="text-indigo-600 dark:text-indigo-400" size={32} />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">PDF or DOCX • Max 10MB</p>
                  </label>
                ) : (
                  <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    {status !== 'uploading' && (
                      <button
                        onClick={() => {
                          setFile(null);
                          setStatus('idle');
                          setMessage('');
                          setProgress(0);
                          setMatches([]);
                        }}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {status === 'uploading' && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Processing your resume...</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-sm">
                    <div
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-full transition-all duration-300 rounded-full shadow-lg"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {message && (
                <div
                  className={`mt-6 p-4 rounded-lg whitespace-pre-line flex items-start space-x-3 border-l-4 ${
                    status === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                      : status === 'error'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  }`}
                >
                  {status === 'success' && (
                    <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={24} />
                  )}
                  {status === 'error' && (
                    <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={24} />
                  )}
                  {status === 'uploading' && (
                    <Loader className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 animate-spin" size={24} />
                  )}
                  <p
                    className={`text-sm font-medium ${
                      status === 'success'
                        ? 'text-green-800 dark:text-green-200'
                        : status === 'error'
                        ? 'text-red-800 dark:text-red-200'
                        : 'text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {message}
                  </p>
                </div>
              )}

              {/* Upload Button */}
              <div className="mt-6">
                <button
                  onClick={handleUpload}
                  disabled={!file || status === 'uploading'}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition"
                >
                  {status === 'uploading' ? (
                    <span className="flex items-center justify-center">
                      <Loader className="mr-2 animate-spin" size={20} />
                      Analyzing Your Resume...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Upload className="mr-2" size={20} />
                      Upload & Find Best Job Match
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : activeTab === 'analytics' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Track your resume scanning activity and insights</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricsCard 
                  title="Total Resumes"
                  value="24"
                  icon={FileText}
                  trend="up"
                  trendValue="+12%"
                  color="indigo"
                />
                <MetricsCard 
                  title="Avg Match Score"
                  value="82%"
                  icon={Target}
                  trend="up"
                  trendValue="+5%"
                  color="green"
                />
                <MetricsCard 
                  title="Recent Activity"
                  value="8"
                  icon={BarChart3}
                  trend="up"
                  trendValue="+2"
                  color="blue"
                />
                <MetricsCard 
                  title="Success Rate"
                  value="94%"
                  icon={CheckCircle}
                  trend="up"
                  trendValue="+3%"
                  color="purple"
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ActivityChart />
                <SkillsChart />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <RecentActivity />
                </div>
                <ScoreDistribution />
              </div>
            </div>
          ) : activeTab === 'matches' ? (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Matches</h2>
              {matches.length > 0 ? (
                <div className="space-y-4">
                  {matches.map((m) => {
                    let score = m.match_score;
                    if (typeof score === 'number') {
                      if (score <= 1) score = Math.round(score * 100);
                      else score = Math.round(score);
                    }

                    const company = m.company || m.employer || '';
                    const location = m.location || m.city || '';
                    const skills = Array.isArray(m.skills) ? m.skills : (m.tags || []);

                    return (
                      <div key={m.jobId || m.id || m.url} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{m.title}</h3>
                            <p className="text-slate-600 dark:text-gray-400">{company} • {location}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${score >= 75 ? 'text-emerald-600 dark:text-emerald-400' : score >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>{score}% match</div>
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-gray-300 mb-4">{m.summary || m.excerpt || 'No summary available.'}</p>
                        {skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {skills.slice(0, 6).map((s, idx) => (
                              <span key={idx} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">{s}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          {m.url ? (
                            <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">View & Apply →</a>
                          ) : (
                            <span className="text-slate-500 dark:text-gray-500">No external link</span>
                          )}
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Save</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState 
                  icon={Target}
                  title="No Matches Yet"
                  description="Upload your resume to get personalized job matches tailored to your skills and experience"
                  action={() => setActiveTab('upload')}
                  actionLabel="Upload Resume"
                />
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Overview of your resume scanning activity</p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricsCard 
                  title="Resumes Uploaded"
                  value="5"
                  icon={FileText}
                  color="indigo"
                />
                <MetricsCard 
                  title="Job Matches"
                  value={matches.length.toString()}
                  icon={Target}
                  color="green"
                />
                <MetricsCard 
                  title="Last Updated"
                  value="Today"
                  icon={CheckCircle}
                  color="blue"
                />
              </div>

              {/* Recent Resumes Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Resumes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-slate-600 dark:text-gray-400" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">resume.pdf</div>
                        <div className="text-sm text-slate-600 dark:text-gray-400">Uploaded 2 days ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">Parsed</span>
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">View</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Matches Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Matches</h3>
                <div className="space-y-4">
                  {matches.length > 0 ? matches.slice(0, 5).map((m) => {
                    let score = m.match_score;
                    if (typeof score === 'number') {
                      if (score <= 1) score = Math.round(score * 100);
                      else score = Math.round(score);
                    }
                    return (
                      <div key={m.jobId || m.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-gray-700 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                            <Target size={24} className="text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">{m.title}</div>
                            <div className="text-sm text-slate-600 dark:text-gray-400">{m.company || m.employer}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{score}%</div>
                          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">Apply</button>
                        </div>
                      </div>
                    );
                  }) : (
                    <EmptyState 
                      icon={Target}
                      title="No Matches Yet"
                      description="Upload your resume to see your top job matches"
                      action={() => setActiveTab('upload')}
                      actionLabel="Upload Resume"
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
