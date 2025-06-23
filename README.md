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
Production ready build:
```bash
npm run build
```
S3:
-Created bucket (no static website hosting)
-Uploaded contents of /build folder
-CloudFront:
-Set origin to S3 bucket
-Set default root object to index.html
-SSL automatically included with CloudFront domain (no ACM setup required)
-Final URL: https://d2bd1im626ftje.cloudfront.net

###Why Use CloudFront with S3?
-Global CDN: Fast loading for users worldwide
-Free HTTPS: Automatic SSL via CloudFront domain
-Better Caching: More control and performance
-Reduced S3 Load: CloudFront caches assets
-Scalability: Handles sudden traffic spikes
-Security: Support for WAF, DDoS protection, signed URLs

###Backend via Terraform
Infrastructure-as-Code lets you version and redeploy AWS resources easily.
TO DO NEXT:
-Write Terraform configs for:
-Lambda function
-API Gateway
-IAM Role with execution permissions
-Lambda environment variables

Then simply run
```bash
terraform init
terraform apply
```
