import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
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
      userId: newUser.id
    };

    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN , {
      expiresIn: '30d', 
    });

    // dummy login response
    res.status(200).json({ payload, accessToken, refreshToken, message: 'Logged in!' });
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
      userId: existingUser?.id
    };

    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN , {
      expiresIn: '30d', 
    });

    // dummy login response
    res.status(200).json({ payload, accessToken, refreshToken, message: 'Logged in!' });
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


// GET /api/v1/user/:id
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
try {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    accountType: user.accountType,
    createdAt: user.createdAt
  });
} catch (error) {
  console.error('Failed to get user profile:', error);
  res.status(500).json({ message: 'Internal server error' });
}
};

// PATCH /api/v1/user/:id
export const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.update({ name, username, email });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/v1/user/discover/all
// Fetches all users except the currently logged-in user, including their bio information
export const getAllUsersExceptCurrent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get current user ID from JWT token (set by auth middleware) or from headers (set by API gateway)
    const currentUserId = (req as any).user?.userId || req.headers['x-user-id'];
    
    if (!currentUserId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Fetch all users except the current user, including their bio
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: Number(currentUserId)
        }
      },
      include: [{
        model: UserBio,
        as: 'bio',
        required: false // LEFT JOIN - include users even if they don't have a bio
      }],
      attributes: {
        exclude: ['password'] // Don't return password
      },
      order: [['createdAt', 'DESC']] // Order by newest first
    });

    // Format the response to combine user and bio information
    const formattedUsers = users.map(user => {
      const userData = user.toJSON() as any; // Type assertion for included bio
      const bioData = userData.bio;
      return {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        accountType: userData.accountType,
        createdAt: userData.createdAt,
        bio: bioData ? {
          birthday: bioData.showBirthday ? bioData.birthday : null,
          pronouns: bioData.showPronouns ? bioData.pronouns : null,
          userVibe: bioData.userVibe,
          othersVibe: bioData.othersVibe,
          eventInterests: bioData.eventInterests,
          availability: bioData.availability,
          purpose: bioData.purpose,
          bio: bioData.bio,
          profilePicture: bioData.profilePicture
        } : null
      };
    });

    res.status(200).json({
      message: 'Users fetched successfully',
      count: formattedUsers.length,
      users: formattedUsers
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

