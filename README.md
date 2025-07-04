# Serverless Weather App – React Frontend + AWS (Lambda, API Gateway, S3, CloudFront)

This is a fully deployed, full-stack weather application that fetches live weather data using the OpenWeather API. The frontend is built with **React**, and the backend is powered by **AWS Lambda** and **API Gateway**, all deployed via **S3 and CloudFront** for high performance and scalability.

View the live weather app: [Weather App](https://d2bd1im626ftje.cloudfront.net/)

---
## How to Use
1. Type in city only (e.g. moline)
2. Click Search button
3. View current weather data
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
- **HTTP Client:** Axios (for frontend API calls)
- **API Routing:** AWS API Gateway
- **Deployment:** Amazon S3 + CloudFront
- **IaC:** Terraform

---

## Architecture

![Architecture Diagram](https://github.com/aclaycode/weather_app_fullstack_aws_react/blob/5835989bff0ec8f20e45679c027be6e9ec746b5b/diagram/Weather_App_Architecture_Diagram.png)

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

Node.js Lambda function that serves as the backend API endpoint:

- Accepts HTTP `GET` requests with a query parameter: `?q=CityName`
- Uses an environment variable to securely access the OpenWeather API key
- Makes a request to OpenWeather’s `/data/2.5/weather` endpoint with the city name
- Extracts relevant fields (city name, temperature, weather description) and returns them as JSON
- Handles **CORS** by:
  - Validating `Origin` header against a whitelist (localhost + CloudFront domain)
  - Responding to `OPTIONS` preflight requests with proper CORS headers
  - Setting `Access-Control-Allow-Origin`, `Allow-Headers`, and `Allow-Methods` dynamically
- Zipped and uploaded manually to Lambda via AWS Console


### API Gateway

- Created an **HTTP API** (not REST API) to serve as the entry point for frontend requests
- Integrated with the **AWS Lambda** function using Lambda proxy integration
- **CORS handled entirely in the Lambda response**, including:
  - `Access-Control-Allow-Origin`: Dynamically set to allow `http://localhost:3000` and CloudFront domain
  - `Access-Control-Allow-Methods`: `GET`, `OPTIONS`
  - `Access-Control-Allow-Headers`: `Content-Type`, `Authorization`, etc.
- No need to configure CORS in API Gateway console (since Lambda handles it)
- Deployed to `/dev` stage
- Working endpoint:  
  `https://zijp8jy0m5.execute-api.us-east-2.amazonaws.com/dev/weatherApi?q=CityName`


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

This hybrid approach provided hands-on learning both in the AWS Console and through declarative infrasture automation.

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
