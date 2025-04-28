import { Request, Response } from "express";
import User from "../models/model.user";
import UserBio from "../models/model.userbio";

// POST /api/v1/user/:id/bio
export const createUserBio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // userId from URL
    const {
      birthday,
      showBirthday,
      pronouns,
      showPronouns,
      vibe,
      vibeWith,
      interests,
      availability,
      whyHere,
      bio,
      photos,
    } = req.body;

    // 1. Check if user exists
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // 2. Check if UserBio already exists (optional but good)
    const existingBio = await UserBio.findOne({ where: { userId: id } });

    if (existingBio) {
      res.status(400).json({ message: "UserBio already exists" });
      return;
    }

    // 3. Create UserBio
    const newUserBio = await UserBio.create({
      userId: Number(id),
      birthday,
      showBirthday,
      pronouns,
      showPronouns,
      vibe,
      vibeWith,
      interests,
      availability,
      whyHere,
      bio,
      photos,
    });

    res
      .status(201)
      .json({ message: "UserBio created successfully", userBio: newUserBio });
  } catch (error) {
    console.error("Error creating user bio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/v1/user/:id/bio
export const updateUserBio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // userId from URL
    const updates = req.body; // what fields to update

    // 1. Check if user exists
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // 2. Find the UserBio
    const userBio = await UserBio.findOne({ where: { userId: id } });

    if (!userBio) {
      res.status(404).json({ message: "User bio not found" });
      return;
    }

    // 3. Update fields dynamically
    await userBio.update(updates);

    res.status(200).json({ message: "User bio updated successfully", userBio });
  } catch (error) {
    console.error("Error updating user bio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/v1/user/:id/bio
export const getUserBio = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userBio = await UserBio.findOne({
      where: { userId: Number(user?.id) },
    });

    if (!userBio) {
      res.status(404).json({ message: "userBio not found" });
      return;
    }

    res.status(200).json(userBio);
  } catch (error) {
    console.error("Error fetching user bio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
