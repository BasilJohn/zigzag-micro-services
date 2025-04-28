require('dotenv').config(); // Load .env

const isDocker = process.env.DOCKER === 'true';

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'zigzag',
    database: process.env.DB_NAME || 'events_db',
    host: isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_DOCKER,
    port: 5432,
    dialect: 'postgres',
  }
};