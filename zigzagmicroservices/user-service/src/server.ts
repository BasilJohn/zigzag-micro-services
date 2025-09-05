import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/database";

import userRouter from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());

// Start Server
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
      console.log(`🚀 User Service running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
  });
