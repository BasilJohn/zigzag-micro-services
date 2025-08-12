
import { RequestHandler } from "express";

export const requireInternalKey: RequestHandler = (req, res, next): void => {
  const key = req.header("x-internal-key");
  if (!key || key !== process.env.INTERNAL_GATEWAY_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return; // <-- end the function, but do NOT return the Response
  }
  next();
};
