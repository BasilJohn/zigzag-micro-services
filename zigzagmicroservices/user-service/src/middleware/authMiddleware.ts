import dotenv from "dotenv";

dotenv.config();
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN;
if (!JWT_SECRET_ACCESS_TOKEN) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}


export const authenticateAccessToken = (req:Request, res: Response, next:NextFunction)=>{

    const authHeader= req.headers['authorization']

    const accessToken = authHeader && authHeader.split(' ')[1]

    if(!accessToken) {
        res.status(401).json({message:'Unauthorized'})
        return
    }

    jwt.verify(accessToken,JWT_SECRET_ACCESS_TOKEN,(err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid or Expired Token' })
        }
        (req as any).user = user
        //Next is needed to move out of middleware
        next()
    }) 
}