API Gateway with Microservices

This project demonstrates a basic Microservices Architecture setup using Node.js, featuring:
	•	An API Gateway that routes client requests.
	•	A User Service to handle authentication.
	•	An Event Service to manage event-related data.


📋 Overview
	•	API Gateway:
	•	Acts as a single entry point for all client requests.
	•	Proxies API requests to the respective backend services.

•	User Service:
•	Manages user login functionality.    

•	Event Service:
•	Handles event listing and management.

🛠️ Tech Stack
	•	Node.js
	•	Express.js
	•	PostgreSQL (for database)
	•	TypeScript
	•	http-proxy-middleware (for API Gateway proxying)

🚀 Getting Started

1. Clone the Repository  

git clone <repo-url>
cd <repo-directory>

2. Setup Environment Variables

Create a .env file inside the API Gateway, User Service, and Event Service folders.

For API Gateway (api-gateway/.env):

PORT=3000
USER_SERVICE_URL=http://localhost:3030
EVENT_SERVICE_URL=http://localhost:3031

For User Service (user-service/.env) and Event Service (event-service/.env)

3. Install Dependencies

Inside each service’s folder (api-gateway, user-service, events-service):
npm install

4. Make sure database is up for both the services, use docker if needed.

5. Running the Services

Start each service in a separate terminal:

User Service:
cd user-service
npm run dev

Event Service:
cd events-service
npm run dev

API Gateway:
cd api-gateway
npm run dev

📡 Service Endpoints

Once everything is running:

User Service -->http://localhost:3000/api/v1/user/login
Event Service -->http://localhost:3000/api/v1/events/getAllEvents

✅ All requests go through the API Gateway (port 3000).

Client
  |
  |----> [API Gateway] (port 3000)
               |
               |-- (if /api/v1/user/*) --> [User Service] (port 3030)
               |
               |-- (if /api/v1/events/*) --> [Event Service] (port 3031)

•	The Client only talks to API Gateway.
•	The Gateway decides which service to forward the request to based on   the URL path.              