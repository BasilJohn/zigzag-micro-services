import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import { authenticateAccessToken } from "./middleware/authMiddleWare";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add middleware to parse JSON
app.use(express.json());

// CORS middleware - must come before routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Debug middleware - log all requests
app.use((req, res, next) => {
  next();
});


// Manual proxy for /api/v1/user
app.use("/api/v1/user", async (req, res) => {
  try {
    const targetUrl = `http://user-service:3030${req.originalUrl}`;
    
    // Use the built-in http module to make the request
    const http = require('http');
    const url = require('url');
    
    const parsedUrl = url.parse(targetUrl);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers
      }
    };
    
    const proxyReq = http.request(options, (proxyRes: any) => {console.log(`🔄 Response from user service: ${proxyRes.statusCode}`);
      
      let data = '';
      proxyRes.on('data', (chunk: any) => {
        data += chunk;
      });
      
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode).send(data);
      });
    });
    
    proxyReq.on('error', (error: any) => {
      res.status(500).json({ error: 'Proxy error', details: error.message });
    });
    
    if (req.method !== 'GET' && req.body) {
      proxyReq.write(JSON.stringify(req.body));
    }
    
    proxyReq.end();
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Proxy error', details: errorMessage });
  }
});

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
      on: {
      proxyReq: (proxyReq, req, _res) => {
        const user: any = (req as any).user;
        if (user && user.userId) {
          proxyReq.setHeader("x-user-id", user.userId);
          if (user.email) proxyReq.setHeader("x-user-email", user.email);
        }
        if (process.env.INTERNAL_GATEWAY_KEY) {
          proxyReq.setHeader("x-internal-key", process.env.INTERNAL_GATEWAY_KEY);
        }
      },
      error: (err, _req, res) => {
        (res as any).status(502).json({ message: "Upstream service unavailable" });
      },
    },
  })
);

// Proxy /api/v1/media
app.use(
  "/api/v1/media",
  authenticateAccessToken,
  createProxyMiddleware({
    target: process.env.MEDIA_SERVICE_URL || "http://media-service:3032", // Use Docker service name
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/media": "",
    },
  })
);

// Catch all
app.use((req, res) => {
  res.status(404).send("❌ API Gateway: Route not found.");
});

app.listen(PORT, () => {
  console.log(`✅ API Gateway running on port ${PORT}`);
  console.log(`🔗 User Service: ${process.env.USER_SERVICE_URL}`);
  console.log(`🔗 Event Service: ${process.env.EVENT_SERVICE_URL}`);
  console.log(`🔗 Media Service: ${process.env.MEDIA_SERVICE_URL}`);  
});