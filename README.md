# Weather App – Full Stack Project (React + AWS Lambda + API Gateway + CloudFront)

This is a fully deployed, full-stack weather application that fetches live weather data using the OpenWeather API. The frontend is built with **React**, and the backend is powered by **AWS Lambda** and **API Gateway**, all deployed via **S3 and CloudFront** for high performance and scalability.

---

## Features

- Search for current weather by city
- Serverless backend using AWS Lambda
- API Gateway integration for routing
- CORS-compliant backend-to-frontend communication
- Secure API key management using Lambda environment variables
- Frontend deployed to S3 and served via CloudFront
- Infrastructure-as-Code setup using Terraform

---

## Tech Stack

- **Frontend:** React (Create React App), JavaScript, HTML, CSS
- **Backend:** Node.js (AWS Lambda)
- **API Routing:** AWS API Gateway
- **Deployment:** Amazon S3 + CloudFront
- **IaC:** Terraform

---

## Project Setup & Steps

### Frontend (React)

Built a user interface that:
- Accepts city input
- Displays weather data
- Initially used direct OpenWeather API call with API key exposed
- Refactored frontend to call a backend endpoint instead

Now uses:
```js
fetch("https://your-api-id.execute-api.us-east-2.amazonaws.com/dev/weatherApi?q=Chicago")
```

- Verified frontend works with backend both locally and in production

Production build generated using:
```bash
npm run build
```

### Backend (AWS Lambda)
Node.js Lambda function that:
- Accepts query param ?q=CityName
- Uses an environment variable for OpenWeather API key
- Makes request to OpenWeather API
- Returns JSON weather data
- Handles CORS (localhost + CloudFront)
- Uploaded zipped Lambda code to AWS

### API Gateway
- Created HTTP API or REST API
- Integrated Lambda function as backend
- Enabled CORS with:
- Access-Control-Allow-Origin: localhost + CloudFront
- Allowed Methods: GET, OPTIONS
- Allowed Headers: Content-Type, Authorization, etc.
- Deployed to /dev stage
- Working endpoint: https://your-api-id.execute-api.us-east-2.amazonaws.com/dev/weatherApi?q=CityName

### Frontend-Backend Integration
- React app fetches weather data through the deployed API Gateway endpoint
- Fully integrated and confirmed working

### Frontend Deployment (S3 + CloudFront)

#### Production ready build:
```bash
npm run build
```

#### S3:
- Created bucket (no static website hosting)
- Uploaded contents of /build folder

#### CloudFront:
- Set origin to S3 bucket
- Set default root object to index.html (front end file)
- SSL automatically included with CloudFront domain (no ACM setup required)
- Final URL: https://d2bd1im626ftje.cloudfront.net

#### Why Use CloudFront with S3?
- Global CDN: Fast loading for users worldwide
- Free HTTPS: Automatic SSL via CloudFront domain
- Better Caching: More control and performance
- Reduced S3 Load: CloudFront caches assets
- Scalability: Handles sudden traffic spikes
- Security: Support for WAF, DDoS protection, signed URLs

#### AWS Configuration

All AWS resources were initially set up **manually via the AWS Console**, not using Terraform. This was done intentionally to:

- Gain exposure to key AWS services used in serverless applications (e.g., Lambda, API Gateway, IAM)
- Learn to navigate and configure resources through the AWS Management Console
- Develop a better understanding of how individual AWS components work together
- Reinforce concepts by building the infrastructure step-by-step
- Get comfortable working directly within the AWS ecosystem

#### Terraform Integration

After successfully deploying the project through the console, Terraform was introduced to:

- Practice Infrastructure as Code (IaC) using real-world resources
- Understand how to codify, version, and reuse AWS configurations
- Gain exposure to how Terraform interacts with existing AWS infrastructure
- Demonstrate an example use-case: updating the Lambda function’s **Node.js runtime from 18 to 20** using Terraform

This hyrbrid approach provided hands-on learning both in the AWS Console and through declarative infrasture automation.

---
### Key Learnings

This project provided valuable full-stack and cloud deployment experience, with a strong emphasis on modern development practices. Key takeaways include:

- **End-to-End Ownership:** Managed the full lifecycle of a web application—from frontend development to backend deployment and infrastructure setup.
- **Cloud Fluency:** Gained hands-on exposure to core AWS services including S3, Lambda, API Gateway, IAM, and CloudFront, reinforcing how they interconnect.
- **Serverless Architecture:** Built and deployed a fully serverless backend using AWS Lambda with environment-based configuration and CORS handling.
- **Infrastructure-as-Code (IaC):** Used Terraform to codify, update, and manage cloud resources programmatically, including updating Lambda runtime versions.
- **Security & Scalability Awareness:** Implemented HTTPS, API key protection, and performance optimization through CDN integration and caching.
- **Practical Debugging & Integration:** Addressed real-world challenges like cross-origin resource sharing (CORS), environment variable setup, and deployment verification across environments.

This project reflects both technical implementation and thoughtful process, with a focus on maintainability, security, and adaptability in real-world cloud ecosystems.
