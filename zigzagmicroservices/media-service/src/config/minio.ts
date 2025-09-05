import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

const isDocker = process.env.DOCKER === 'true'; // set this in docker-compose if needed


const minioClient = new Client({
  endPoint:isDocker ? process.env.MINIO_ENDPOINT||'minio' : 'localhost',
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

// Ensure the bucket exists
const BUCKET = process.env.MINIO_BUCKET || "media-bucket";

async function ensureBucketWithRetry(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const exists = await minioClient.bucketExists(BUCKET);
      if (!exists) {
        await minioClient.makeBucket(BUCKET, "");
        console.log(`✅ Created bucket: ${BUCKET}`);
      } else {
        console.log(`✅ Bucket ${BUCKET} already exists`);
      }
      return; // Success, exit function
    } catch (err: any) {
      console.error(`❗ Attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) {
        console.log(`🔁 Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(
          "❌ Could not connect to MinIO after several attempts. Exiting."
        );
        process.exit(1);
      }
    }
  }
}

ensureBucketWithRetry();

export { minioClient, BUCKET };