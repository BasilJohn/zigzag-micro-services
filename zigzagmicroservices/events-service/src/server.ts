import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRouter from "./routes/event.route";
import sequelize from "./config/database";

//Load DotENV
dotenv.config();
const PORT = process.env.PORT || 3000;


//Express
const app = express();
//The express.json middleware is important for parsing incoming
// JSON payloads and making that data available in the req.body
app.use(express.json());
app.use("/api/v1/events", eventRouter);

// Middleware
app.use(cors());


sequelize.sync({alter:true}).then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Event Service running at http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error('❌ Failed to connect to database:', err);
  });