# Deployment Guide - Resume Scanner Application

## Your S3 Bucket
**Upload Bucket**: `elvin-resumeai-api`

## 1. Deploy Updated Lambda (uploadResume)

### Set Environment Variables
```bash
aws lambda update-function-configuration \
  --function-name uploadResume \
  --environment "Variables={UPLOAD_BUCKET=elvin-resumeai-api,AWS_REGION=us-east-1}"
```

### Attach IAM Policy for S3 Access
```bash
# Get the Lambda execution role name
ROLE_ARN=$(aws lambda get-function-configuration --function-name uploadResume --query Role --output text)
ROLE_NAME=$(basename "$ROLE_ARN")

# Create inline policy
cat > s3-putobject-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::elvin-resumeai-api/uploads/*"
    }
  ]
}
EOF

# Attach policy to role
aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "AllowS3PutUploads" \
  --policy-document file://s3-putobject-policy.json
```

### Package and Deploy Lambda Code
```bash
# Create deployment package (from project root)
zip -r uploadResume.zip uploadResume.mjs

# Update Lambda function code
aws lambda update-function-code \
  --function-name uploadResume \
  --zip-file fileb://uploadResume.zip
```

### Test Lambda
```bash
aws lambda invoke \
  --function-name uploadResume \
  --payload '{"fileName":"resume.pdf","fileType":"application/pdf","fileSizeBytes":1048576}' \
  output.json && cat output.json
```

Expected response:
```json
{
  "statusCode": 200,
  "body": "{\"uploadUrl\":\"https://...\",\"s3Key\":\"uploads/...\",\"bucket\":\"elvin-resumeai-api\",...}"
}
```

## 2. Deploy Frontend (React Build)

### Build the React App
```bash
npm run build
```

### Deploy to S3
Replace `YOUR_FRONTEND_BUCKET` with your actual frontend hosting bucket:
```bash
aws s3 sync build/ s3://YOUR_FRONTEND_BUCKET --delete
```

### Invalidate CloudFront Cache
Replace `YOUR_DISTRIBUTION_ID`:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 3. API Gateway

### Redeploy API Stage
Replace `YOUR_REST_API_ID` and `YOUR_STAGE_NAME`:
```bash
aws apigateway create-deployment \
  --rest-api-id YOUR_REST_API_ID \
  --stage-name YOUR_STAGE_NAME
```

### Verify CORS
- Lambda already includes CORS headers in `uploadResume.mjs`
- Ensure API Gateway has OPTIONS method configured or Lambda proxy integration handles it

## 4. Cognito Configuration

### Verify Sign-out URLs
In AWS Cognito Console:
- User Pool: `us-east-1_yRZLjI1lK`
- App Client: `1hj5ncp9olo3kdpi5t5bjshjgb`
- Add Sign-out URLs:
  - `http://localhost:3000`
  - `http://localhost:3000/`
  - (Add production URL when deployed)

## 5. Testing

### Frontend Flow
1. Sign in with Cognito credentials
2. Upload a resume (PDF/DOC/DOCX/TXT)
3. Verify presigned URL generation
4. Confirm S3 upload succeeds
5. Check parse and job matching results
6. Test sign-out redirect

### Verify S3 Uploads
```bash
aws s3 ls s3://elvin-resumeai-api/uploads/ --recursive
```

## Troubleshooting

### "Missing UPLOAD_BUCKET env"
- Ensure Lambda env vars are set (step 1)
- Redeploy Lambda code after setting env vars

### "Access Denied" on S3 PUT
- Verify IAM policy is attached to Lambda execution role
- Check bucket name: `elvin-resumeai-api`
- Ensure resource ARN: `arn:aws:s3:::elvin-resumeai-api/uploads/*`

### CORS Errors
- Confirm Lambda returns CORS headers (already in code)
- Verify API Gateway has Lambda proxy integration
- Check browser Network tab for preflight OPTIONS request

### Sign-out "Invalid request"
- Verify Cognito Sign-out URLs are configured
- Clear browser cache and localStorage
- Ensure `post_logout_redirect_uri` matches Cognito settings

## Resources
- S3 Bucket: `elvin-resumeai-api`
- Region: `us-east-1`
- Lambda: `uploadResume`
- User Pool: `us-east-1_yRZLjI1lK`
- App Client: `1hj5ncp9olo3kdpi5t5bjshjgb`
