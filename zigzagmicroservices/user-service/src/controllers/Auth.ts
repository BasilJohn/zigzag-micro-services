import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'



const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN;
const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN;
if (!JWT_SECRET_ACCESS_TOKEN || !JWT_SECRET_REFRESH_TOKEN) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// POST /api/v1/user/signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password, accountType } = req.body;

    // Check if the user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: 'Username already in use' });
      return;
    }

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password,
      accountType,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ "message": error });
  }
};

// POST /api/v1/user/login
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    //Create a JWT token if login is successful
    const payload = {
      email: email,
    };

    const user ={
      email
    }

    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(user, JWT_SECRET_REFRESH_TOKEN , {
      expiresIn: '7d', 
    });

    // dummy login response
    res.status(200).json({ user, accessToken,refreshToken, message: 'Logged in!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

