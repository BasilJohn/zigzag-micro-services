import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy /api/v1/user
app.use(
  "/api/v1/user",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/user": "/api/v1/user",
    },
  })
);

// Proxy /api/v1/events
app.use(
  "/api/v1/events",
  createProxyMiddleware({
    target: process.env.EVENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/events": "/api/v1/events",
    },
  })
);

// Catch all
app.use((req, res) => {
  res.status(404).send("❌ API Gateway: Route not found.");
});

app.listen(PORT, () => {
  console.log(`✅ API Gateway running on port ${PORT}`);
});
