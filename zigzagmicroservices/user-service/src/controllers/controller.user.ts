import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/model.user'
import UserBio from "../models/model.userbio";


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
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      res.status(400).json({ message: 'Username already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password,10)
    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password:hashedPassword,
      accountType,
    });

    // Save the user to the database
    await newUser.save();

    //Create a JWT token if login is successful
    const payload = {
      email: email,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN , {
      expiresIn: '7d', 
    });

    // dummy login response
    res.status(200).json({ payload, accessToken,refreshToken, message: 'Logged in!' });
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

    const existingUser = await User.findOne({ where: { email } })
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

    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN , {
      expiresIn: '30d', 
    });

    // dummy login response
    res.status(200).json({ payload, accessToken,refreshToken, message: 'Logged in!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/v1/user/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Delete user
    await existingUser.destroy();

    // Delete User Bio
     const userBio = await UserBio.findOne({
          where: { userId: Number(existingUser?.id) },
      });
    
    //Delete userbio if available
    userBio?.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

