import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnect }  from "./config/database";

import userRouter from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
//Db Connect
dbConnect();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Start Server
app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});