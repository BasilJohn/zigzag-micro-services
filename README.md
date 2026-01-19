🚀 Zigzag Server Setup

Welcome to the Zigzag Microservices Server!
This project runs with PostgreSQL + Sequelize ORM + Node.js + TypeScript using Docker Compose.
Everything is clean, modular, and production-ready. ✅

🛠️ Project Stack
	•	Node.js 18.x
	•	TypeScript (strict mode)
	•	Yarn 1.x
	•	PostgreSQL 15
	•	Sequelize ORM 6.x
	•	Docker Compose
	•	Microservices Architecture
	•	user-service
	•	events-service
	•	pgAdmin4 (Optional - database visualizer)


📦 Root Docker Compose Setup

Run everything easily with one command!

# docker-compose.yml (root level)
services:
  postgres:
    image: postgres:15
    container_name: postgres_db
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: zigzag
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@local.com
      PGADMIN_DEFAULT_PASSWORD: admin
    depends_on:
      postgres:
        condition: service_healthy

  user-service:
    build: ./zigzagmicroservices/user-service
    container_name: user_service
    environment:
      - DB_NAME=users_db
      - DB_USER=postgres
      - DB_PASSWORD=zigzag
      - DB_PORT=5432
      - DB_HOST_LOCAL=localhost
      - DB_HOST_DOCKER=postgres
    depends_on:
      postgres:
        condition: service_healthy

  event-service:
    build: ./zigzagmicroservices/events-service
    container_name: event_service
    environment:
      - DB_NAME=events_db
      - DB_USER=postgres
      - DB_PASSWORD=zigzag
      - DB_PORT=5432
      - DB_HOST_LOCAL=localhost
      - DB_HOST_DOCKER=postgres
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  pgdata:


🚀 Quickstart

# Start Docker containers
docker-compose up --build

# Access pgAdmin at: http://localhost:5050
# Email: admin@local.com
# Password: admin

🧹 Setup Per Microservice

Each service (like user-service and events-service) has its own DB and migrations.

Inside each microservice folder:
	1.	Install dependencies:

    npm install

	2.	Create Database (if not already created):

    yarn db:create:docker

  3.	Run Migrations:

    yarn db:migrate

  4. npm run dev  


For media-service, just ensure MinIO is running (via docker-compose up) and the service will automatically create the required bucket when it starts.

🗂️ Sequelize Useful Commands

## 🗂️ Sequelize Useful Commands

| Task            | Command                        |
|-----------------|---------------------------------|
| Create migration| `yarn sequelize-cli migration:generate --name create-xxx-table` |
| Create seeder   | `yarn sequelize-cli seed:generate --name demo-seeder` |
| Run migrations  | `yarn sequelize-cli db:migrate` |
| Undo migration  | `yarn sequelize-cli db:migrate:undo` |
| Run seeders     | `yarn sequelize-cli db:seed:all` |
| Undo seeders    | `yarn sequelize-cli db:seed:undo:all` |
