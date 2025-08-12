import { Request, Response, NextFunction } from "express";
import sequelize from "../config/database";
import Event from "../models/Events";
import EventAttendee from "../models/EventAttendee";

export const joinEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  const userId = (req as any).user?.id; // <-- set by authenticateAccessToken
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const tx = await sequelize.transaction();
  try {
    const event = await Event.findByPk(eventId, { transaction: tx });
    if (!event) {
      await tx.rollback();
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const [attendee, created] = await EventAttendee.findOrCreate({
      where: { eventId: Number(eventId), userId },
      defaults: { eventId: Number(eventId), userId },
      transaction: tx,
    });

    await tx.commit();
    res.status(created ? 201 : 200).json({
      message: created ? "Joined event" : "Already joined",
      attendeeId: attendee.id,
    });
  } catch (err) {
    await tx.rollback();
    next(err);
  }
};

export const withdrawEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params;
  const userId = (req as any).user?.id; // <-- set by authenticateAccessToken
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const deleted = await EventAttendee.destroy({
      where: { eventId: Number(eventId), userId },
    });
    if (deleted) {
      res
        .status(200)
        .json({ message: "Successfully withdrawn from the event" });
      return;
    }
    res.status(404).json({ message: "You were not registered for this event" });
  } catch (err) {
    next(err);
  }
};
