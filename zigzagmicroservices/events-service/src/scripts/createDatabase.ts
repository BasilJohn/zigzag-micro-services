import { Sequelize } from 'sequelize';
require('dotenv').config();

const isDocker = process.env.DOCKER === 'true';
const host = isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;
const user = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'zigzag';
const port = process.env.DB_PORT || '5432';

// Connect to "postgres" database first (not your app DB)
const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/postgres`, {
  dialect: 'postgres',
});

async function createDatabase() {
  try {
    await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log('✅ Database created successfully');
    process.exit(0);
  } catch (error: any) {
    if (error.original?.code === '42P04') { // 42P04 = "already exists"
      console.log('ℹ️  Database already exists');
      process.exit(0);
    } else {
      console.error('❌ Error creating database:', error);
      process.exit(1);
    }
  }
}

createDatabase();