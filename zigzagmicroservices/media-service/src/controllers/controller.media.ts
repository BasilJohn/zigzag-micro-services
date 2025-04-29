import { Request, Response } from "express";
import { minioClient, BUCKET } from "../config/minio";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Memory storage for Multer
const upload = multer({ storage: multer.memoryStorage() }).single('file');

// POST /api/v1/media/upload
export const uploadFile = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'File upload error', error: err.message });

    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    const fileName = uuidv4() + '-' + req.file.originalname;

    try {
      await minioClient.putObject(BUCKET, fileName, req.file.buffer, req.file.size, {
        'Content-Type': req.file.mimetype,
      });

      const fileUrl = `${process.env.MINIO_PUBLIC_URL}/${BUCKET}/${fileName}`;

      res.status(201).json({ message: 'File uploaded successfully', url: fileUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload failed', error });
    }
  });
};