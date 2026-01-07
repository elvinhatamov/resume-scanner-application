# ResumeAI - Career Command Center

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AWS](https://img.shields.io/badge/AWS-Cloud-orange.svg)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)

**Next-Gen Career Matching** - AI-powered job matching that analyzes your skills and connects you with perfect opportunities in real-time

![Landing Page Hero](./screenshots/05-landing-page-hero.png)

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [AWS Infrastructure](#aws-infrastructure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🌟 Overview

ResumeAI is a comprehensive full-stack resume scanning and job matching platform that revolutionizes the way candidates connect with opportunities. Built with modern web technologies and powered by AWS serverless infrastructure, the application provides:

- **Intelligent Resume Analysis** - Upload PDF resumes and get instant AI-powered parsing and analysis
- **Smart Job Matching** - Advanced percentage-based matching algorithm that compares candidate skills with job requirements
- **Real-time Recommendations** - Get immediate feedback on job compatibility with detailed match explanations
- **Secure User Management** - Complete authentication system with AWS Cognito for personalized experiences
- **Interactive Dashboard** - Beautiful, responsive dashboard to view all matches and track application progress
- **Scalable Architecture** - Built on AWS serverless technologies for high performance and reliability

The platform combines a React-based frontend with AWS Lambda functions, API Gateway, RDS Aurora database, and S3 storage to deliver a seamless user experience from resume upload to job matching.

## ✨ Features

- 📄 **Resume Upload & Parsing** - Upload PDF resumes for instant analysis with support for multiple file formats
- 🤖 **AI-Powered Matching** - Intelligent job matching algorithm with percentage scores showing compatibility
- 🎯 **Skill Alignment** - Detailed comparison of candidate skills with job description requirements
- 📊 **Interactive Dashboard** - View all matches with detailed explanations, match percentages, and analytics
- 🔐 **Secure Authentication** - User registration and login powered by AWS Cognito with JWT tokens
- 💾 **Data Persistence** - Store resumes and matches in AWS RDS Aurora for reliable data management
- ⚡ **Serverless Architecture** - Fast, scalable AWS Lambda functions ensure optimal performance
- 🌐 **RESTful API** - Clean API design with AWS API Gateway for seamless integration
- 📈 **Analytics** - Track job matches and application progress with visual charts and metrics
- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- 🌙 **Dark Mode Support** - Toggle between light and dark themes for comfortable viewing

## 📸 Screenshots

### Landing Page

Experience a modern, welcoming interface that introduces users to ResumeAI's powerful capabilities.

![Landing Page Hero](./screenshots/05-landing-page-hero.png)

### Authentication

Secure user authentication powered by AWS Cognito with a clean, intuitive interface.

**Sign In**

![Sign In Page](./screenshots/04-sign-in-page.png)

**Sign Up**

![Sign Up Page](./screenshots/03-sign-up-page.png)

### Dashboard & Job Matching

The heart of ResumeAI - upload your resume and discover perfectly matched opportunities.

**Resume Upload Success**

![Resume Upload Success](./screenshots/02-resume-upload-success.png)

**Job Matches Dashboard**

View your top matches with detailed percentage scores and insights. See 100% and 90% matches at a glance.

![Job Matches Dashboard](./screenshots/01-job-matches-dashboard.png)

### Backend & Infrastructure

<details>
<summary>Click to view AWS infrastructure screenshots</summary>

**API Gateway Resources**

Six API Gateway resources with Lambda integrations for seamless serverless operations.

![API Gateway Resources](./screenshots/09-aws-api-gateway-resources.png)

**Lambda Functions**

Seven Lambda functions handling all backend operations from resume uploads to job matching.

![Lambda Functions List](./screenshots/13-aws-lambda-functions-list.png)

**Lambda Function Overview**

Detailed view of individual Lambda function configuration and monitoring.

![Lambda Function Overview](./screenshots/12-aws-lambda-function-overview.png)

**Lambda Test Event**

Testing Lambda functions with CloudWatch logs for debugging and monitoring.

![Lambda Test Event](./screenshots/11-aws-lambda-test-event.png)

**RDS Aurora Database**

Multi-AZ PostgreSQL database deployment for high availability and data persistence.

![RDS Aurora Database](./screenshots/10-aws-rds-aurora-database.png)

**VPC Configuration**

Secure networking with VPC, subnets, and security groups.

![VPC Configuration](./screenshots/08-aws-vpc-configuration.png)

**Internet Gateway**

Routing configuration for public internet access.

![Internet Gateway](./screenshots/07-aws-internet-gateway.png)

**Cognito User Pool**

User authentication and management with 23+ registered users.

![Cognito User Pool](./screenshots/14-aws-cognito-user-pool.png)

**API Testing with Postman**

Comprehensive API endpoint testing and validation.

![Postman API Testing](./screenshots/06-api-postman-testing.png)

</details>

## 🏗️ Architecture

ResumeAI is built on a modern, serverless architecture that ensures scalability, reliability, and performance.

### Architecture Overview

- **Frontend**: React.js single-page application with responsive design
  - Modern UI components with Tailwind CSS
  - State management with React hooks and context
  - Real-time updates with optimistic rendering
  - Framer Motion for smooth animations
  
- **API Layer**: AWS API Gateway with REST endpoints
  - Six main API resources
  - Lambda proxy integration
  - CORS-enabled for cross-origin requests
  - Request validation and transformation
  
- **Compute**: AWS Lambda functions (Node.js 22.x/24.x)
  - Event-driven, serverless execution
  - Auto-scaling based on demand
  - Pay-per-use pricing model
  - Cold start optimization
  
- **Database**: AWS RDS Aurora (PostgreSQL)
  - Multi-AZ deployment for high availability
  - Automated backups and snapshots
  - Read replicas for scaling
  - Encryption at rest
  
- **Storage**: AWS S3 for resume file storage
  - Presigned URLs for secure uploads
  - Versioning enabled
  - Lifecycle policies for cost optimization
  - Server-side encryption
  
- **Authentication**: AWS Cognito with user pools
  - OAuth 2.0 and OpenID Connect
  - JWT token management
  - Password policies and MFA support
  - User profile management
  
- **Networking**: VPC with public/private subnets, Internet Gateway
  - Security groups for access control
  - Network ACLs for subnet-level security
  - NAT Gateway for private subnet internet access
  - VPC endpoints for AWS service access

### Key Lambda Functions

1. **`uploadResume`** - Handles resume file uploads to S3 with presigned URLs
2. **`job-matching-lambda`** - Performs individual job matching with AI algorithm
3. **`resume-match-all-jobs`** - Matches resume against all available jobs in the database
4. **`lambda-get-user-resume`** - Retrieves user's stored resume from database
5. **`parse-resume`** - Extracts and parses resume content for analysis
6. **`import-jobs`** - Imports job descriptions into the database
7. **`get-resumes`** - Fetches all resumes for a user with metadata

## 🛠️ Tech Stack

### Frontend

- **React.js** (v19.2.0) - Modern UI library for building interactive interfaces
- **JavaScript** (ES6+) - Core programming language
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework for styling
- **Framer Motion** (v12.23.26) - Animation library for smooth transitions
- **Lucide React** (v0.553.0) - Beautiful icon library
- **Recharts** (v3.5.1) - Charting library for data visualization
- **HTML5** - Semantic markup
- **CSS3** - Modern styling and animations

### Backend

- **Node.js** (v22.x/24.x) - JavaScript runtime for Lambda functions
- **AWS Lambda** - Serverless compute service
- **AWS API Gateway** - RESTful API management and routing
- **Express.js patterns** - API structure and middleware

### Database & Storage

- **AWS RDS Aurora** (PostgreSQL) - Relational database for structured data
- **AWS S3** - Object storage for resume files
- **PostgreSQL** - SQL database engine

### Authentication & Security

- **AWS Cognito** - User authentication and authorization
- **JWT Tokens** - Secure token-based authentication
- **AWS IAM** - Identity and access management
- **VPC Security Groups** - Network-level security
- **HTTPS/TLS** - Encrypted data transmission

### DevOps & Infrastructure

- **AWS VPC** - Virtual private cloud networking
- **AWS Internet Gateway** - Internet connectivity
- **AWS Route Tables** - Network routing configuration
- **AWS CloudWatch** - Logging and monitoring
- **Git** - Version control
- **npm** - Package management

### Development Tools

- **Create React App** - React application bootstrapping
- **AWS Amplify** (v6.15.9) - AWS service integration
- **React Testing Library** - Component testing
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
- Node.js (v18 or higher)
- npm (v8 or higher) or yarn
- Git
- AWS Account (for deployment)
- AWS CLI (configured with credentials)
```

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/elvinhatamov/resume-scanner-application.git
cd resume-scanner-application
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the project root (see `.env.example` for template):

```env
REACT_APP_API_URL=your-api-gateway-url
REACT_APP_COGNITO_USER_POOL_ID=your-cognito-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-cognito-client-id
REACT_APP_AWS_REGION=us-east-1
REACT_APP_COGNITO_DOMAIN=your-cognito-domain
REACT_APP_REDIRECT_URI=http://localhost:3000
```

4. **Start the development server**

```bash
npm start
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

The page will reload automatically when you make changes, and lint errors will appear in the console.

### Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode on [http://localhost:3000](http://localhost:3000)
- **`npm test`** - Launches the test runner in interactive watch mode
- **`npm run build`** - Builds the app for production to the `build` folder
- **`npm run eject`** - Ejects from Create React App (one-way operation)

### Building for Production

```bash
# Create optimized production build
npm run build

# The build folder is ready to be deployed
# Files are minified and include hashes for cache busting
```

### Deployment to AWS

For detailed deployment instructions, see the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) file.

Quick deployment steps:

```bash
# Build the application
npm run build

# Deploy to S3 (replace with your bucket name)
aws s3 sync build/ s3://your-frontend-bucket --delete

# Invalidate CloudFront cache (replace with your distribution ID)
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 📡 API Endpoints

The ResumeAI API provides the following endpoints through AWS API Gateway:

### Resume Management

```http
POST /upload
```
Upload resume file to S3 and generate presigned URL
- **Request Body**: `{ fileName, fileType, fileSizeBytes }`
- **Response**: `{ uploadUrl, s3Key, bucket }`

```http
GET /get-resumes
```
Retrieve all resumes for authenticated user
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Array of resume objects with metadata

```http
GET /get-user-resume
```
Get specific resume by user ID
- **Query Params**: `userId`
- **Response**: Resume object with content

### Job Matching

```http
POST /job-matching
```
Match resume with specific job description
- **Request Body**: `{ resumeContent, jobDescription }`
- **Response**: `{ matchPercentage, matchDetails, explanation }`

```http
POST /match-all
```
Match resume against all available jobs in database
- **Request Body**: `{ resumeId }`
- **Response**: Array of job matches sorted by percentage

### Job Management

```http
POST /import-jobs
```
Import job descriptions into the database
- **Request Body**: `{ jobs: [{ title, description, requirements }] }`
- **Response**: `{ imported: count }`

```http
POST /parse-resume
```
Parse resume content and extract structured data
- **Request Body**: `{ resumeText }`
- **Response**: `{ skills, experience, education, contact }`

### Testing with Postman

For comprehensive API testing examples, refer to the Postman collection screenshot:

![Postman API Testing](./screenshots/06-api-postman-testing.png)

All endpoints require proper CORS headers and authentication (except public endpoints). The API uses JWT tokens from AWS Cognito for authentication.

## ☁️ AWS Infrastructure

ResumeAI is built on a robust AWS serverless infrastructure that ensures scalability, security, and high availability.

### Infrastructure Components

**VPC Configuration**
- Custom VPC with CIDR block for isolated networking
- Public and private subnets across multiple availability zones
- Network ACLs for additional security layer

![VPC Configuration](./screenshots/08-aws-vpc-configuration.png)

**Internet Gateway**
- Provides internet connectivity for public subnets
- Route table configuration for traffic routing
- NAT Gateway for private subnet outbound traffic

![Internet Gateway](./screenshots/07-aws-internet-gateway.png)

**API Gateway**
- 6 REST API resources with Lambda proxy integration
- CORS enabled for cross-origin requests
- Request/response transformation
- API keys and usage plans for rate limiting

![API Gateway Resources](./screenshots/09-aws-api-gateway-resources.png)

**Lambda Functions**
- 7 serverless functions handling different operations
- Node.js 22.x/24.x runtime
- VPC integration for database access
- Environment variable management
- CloudWatch Logs integration

![Lambda Functions List](./screenshots/13-aws-lambda-functions-list.png)
![Lambda Function Overview](./screenshots/12-aws-lambda-function-overview.png)

**RDS Aurora Database**
- PostgreSQL-compatible database
- Multi-AZ deployment for high availability
- Automated backups and point-in-time recovery
- Enhanced monitoring with CloudWatch
- Encryption at rest and in transit

![RDS Aurora Database](./screenshots/10-aws-rds-aurora-database.png)

**Cognito User Pool**
- 23+ registered users
- Email verification and password policies
- OAuth 2.0 and OpenID Connect support
- Custom attributes for user profiles
- MFA support for enhanced security

![Cognito User Pool](./screenshots/14-aws-cognito-user-pool.png)

**S3 Storage**
- Resume file storage with versioning
- Presigned URLs for secure uploads
- Lifecycle policies for cost optimization
- Server-side encryption (SSE-S3)
- Bucket: `elvin-resumeai-api`

**CloudWatch**
- Lambda function logs and metrics
- Custom dashboards for monitoring
- Alarms for error rates and latency
- Log insights for debugging

![Lambda Test Event](./screenshots/11-aws-lambda-test-event.png)

### Infrastructure as Code

The infrastructure is deployed and managed using AWS services with configuration files:
- VPC and networking setup
- IAM roles and policies for least privilege access
- Security groups for network access control
- Lambda execution roles with S3 and RDS permissions

### Security Features

- **Encryption**: All data encrypted at rest and in transit
- **Network Isolation**: Lambda functions in private subnets
- **IAM Policies**: Least privilege access for all resources
- **Security Groups**: Restrictive inbound/outbound rules
- **JWT Authentication**: Token-based API authentication
- **HTTPS Only**: All API communication over TLS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. **Fork the project**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Keep PRs focused on a single feature or bug fix

### Code of Conduct

Please note that this project follows a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 👨‍💻 Author

**Elvin Hatamov**

- GitHub: [@elvinhatamov](https://github.com/elvinhatamov)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/elvinhatamov)
- Portfolio: [View my work](https://elvinhatamov.com)

### About the Developer

Full-stack developer passionate about building innovative solutions that connect talent with opportunities. Specializing in React, AWS serverless architecture, and AI-powered applications.

---

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons by [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Powered by [AWS](https://aws.amazon.com/)

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ and ☕ by Elvin Hatamov

*Built with React, AWS Lambda, and a passion for connecting talent with opportunities*

---

### 📊 Project Stats

- **Frontend**: React 19.2.0 with modern hooks
- **Backend**: 7 AWS Lambda functions
- **Database**: Multi-AZ Aurora PostgreSQL
- **Users**: 23+ registered and growing
- **API Endpoints**: 6 RESTful resources
- **Infrastructure**: Fully serverless on AWS

### 🔗 Quick Links

- [Getting Started](#getting-started)
- [API Documentation](#api-endpoints)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Report Issues](https://github.com/elvinhatamov/resume-scanner-application/issues)
- [Request Features](https://github.com/elvinhatamov/resume-scanner-application/issues/new)
