# Essam-Zomool-Backend

## Overview

- Essam-Zomool-Backend is the backend service for the Zomool Admin Panel, built using Node.js, MongoDB and Express.js. This service provides RESTful APIs for managing and processing application data. It is Dockerized for easy deployment and integration into CI/CD pipelines.

## Features

- RESTful API endpoints for CRUD operations.
  
- Authentication and authorization using JWT.
  
- Database integration with MongoDB.
  
- Dockerized setup for containerized deployment.
  
- Integrated with CI/CD pipelines.

## Prerequisites

- Node.js (v14.x or higher)
  
- MongoDB
  
- Docker (optional, for containerization)
  
- Git

## Setup

### 1. Clone the repository

- git clone https://github.com/momagdyy97/Essam-Zomool-Backend.git
  
- cd Essam-Zomool-Backend
  
### 2. Install dependencies
   
- npm install

### 3. Environment Variables

Create a .env file in the root directory and add the following:

- PORT=3001
  
- MONGODB_URI=<your-mongodb-uri>

- JWT_SECRET=<your-secret-key>

### 4. Run the application
   
- npm start

- The backend service should now be running on http://localhost:3001.

### 5. Docker Setup
1. Build the Docker image
   
docker build -t **your-docker-hub-username**/essam-zomool-backend .

2. Run the Docker container
   
- docker run -d -p 3001:3001 --name **your-docker-hub-username**/essam-zomool-backend
  
- The backend service will be available on http://localhost:3001 inside the container.

### Testing

- npm test
