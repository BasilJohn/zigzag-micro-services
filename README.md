# zigzagServer

Node.js Server with TypeScript & Docker

This is a simple Node.js + Express + TypeScript backend that can be containerized using Docker and deployed locally or in the cloud.

🚀 Features

Built with Express.js & TypeScript

Uses dotenv for environment variables

Supports Docker for easy deployment

CORS enabled for cross-origin requests

📌 Prerequisites

Ensure you have the following installed:

Node.js

Docker

📦 Installation

Clone the repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Install dependencies:

npm install

Create a .env file and add:

PORT=8081

Run the development server:

npm run dev

Your server will be running at http://localhost:8081

📡 API Endpoints

Method

Endpoint

Description

GET

/

Home route

GET

/api/data

Returns a sample JSON response

Test using:

curl http://localhost:5000/api/data


🔥 Contributing

Feel free to submit issues or create a pull request.

📝 License

This project is open-source and available under the MIT License.

