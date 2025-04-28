import { Sequelize } from "sequelize";
require("dotenv").config();

const isDocker = process.env.DOCKER === 'true';
const host = isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

//check's if each env values exists
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

//Initiliaze Sequelize
const sequelize = new Sequelize(
  requireEnv("DB_NAME"),
  requireEnv("DB_USER"),
  requireEnv("DB_PASSWORD"),
  {
    host: host,
    dialect: "postgres",
  }
);

export default sequelize