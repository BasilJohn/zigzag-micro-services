import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnect }  from "../src/config/database";
import router  from "./routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1", router);
//Db Connect
dbConnect();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});