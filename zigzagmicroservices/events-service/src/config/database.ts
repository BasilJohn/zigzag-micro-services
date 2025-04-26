import { Sequelize } from "sequelize";
require("dotenv").config();

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
    host: requireEnv("DB_HOST"),
    dialect: "postgres",
  }
);

export default sequelize