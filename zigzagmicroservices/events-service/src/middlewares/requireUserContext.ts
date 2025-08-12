import { RequestHandler } from "express";

export const requireUserContext: RequestHandler = (req, res, next): void => {
  const userId = req.header("x-user-id");
  if (!userId) {
    res.status(401).json({ message: "Missing user context" });
    return; // <-- same here
  }
  (req as any).user = {
    id: userId,
    email: req.header("x-user-email") ?? undefined
  };
  next();
};