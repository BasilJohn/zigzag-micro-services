import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { authenticateAccessToken } from "./middleware/authMiddleWare";

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
  authenticateAccessToken,
  createProxyMiddleware({
    target: process.env.EVENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/events": "/api/v1/events",
    },
  })
);

// Proxy /api/v1/media
app.use(
  "/api/v1/media",
  authenticateAccessToken,
  createProxyMiddleware({
    target: process.env.MEDIA_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/media": "/api/v1/media",
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
