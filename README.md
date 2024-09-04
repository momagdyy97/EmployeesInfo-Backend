Essam-Zomool-Backend
Overview
Essam-Zomool-Backend is the backend service for the Zomool application. It is built using Node.js, Express, and MongoDB.

Features
- User authentication and authorization
- CRUD operations for managing data
- Integration with third-party APIs
- Real-time data updates using WebSockets

Installation

Prerequisites
- Node.js (v14 or higher)
- MongoDB

Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/momagdyy97/Essam-Zomool-Backend.git
   cd Essam-Zomool-Backend

Install dependencies:
npm install

Set up environment variables: Create a .env file in the root directory and add the following variables:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3001

Start the server:
npm start

Usage
Access the API at http://localhost:3001/api
Use Postman or any other API client to interact with the endpoints
