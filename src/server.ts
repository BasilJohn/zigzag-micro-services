import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample Route
app.get("/", (req: Request, res: Response) => {
    res.send("Node.js + TypeScript Server for React Native");
});

// API Endpoint Example
app.get("/api/data", (req: Request, res: Response) => {
    res.json({ message: "Hello from the TypeScript backend!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});