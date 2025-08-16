import { Request, Response, NextFunction, RequestHandler } from "express";
import sequelize from "../config/database";
import Event from "../models/Events";
import EventAttendee from "../models/EventAttendee";

type Params = { eventId: string };

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

// GET /events/:eventId/attendees/me
export const getMyAttendance: RequestHandler<Params> = async (req:Request, res:Response) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({ message: "Invalid eventId" });
    return;
  }

  const userId = (req as any).user?.id; // <-- set by authenticateAccessToken
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const attendee = await EventAttendee.findOne({
    where: { eventId, userId },
  });

  if (attendee) {
    res.status(200).json({
      attending: true,
      attendeeId: attendee.id,
      eventId: attendee.eventId,
      userId: attendee.userId,
    });
    return;
  }
  res.json({ attending: false });
};

/**
 * GET /events/:eventId/attendees
 * Query params (optional):
 *   - page?: number (default 1)
 *   - limit?: number (default 25, max 100)
 */
export const getEventAttendees: RequestHandler = async (req:Request, res:Response) => {
  const eventId = Number(req.params.eventId);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({ message: "Invalid eventId" });
    return;
  }

  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const limit = Math.min(
    Math.max(parseInt(String(req.query.limit ?? "25"), 10) || 25, 1),
    100
  );
  const offset = (page - 1) * limit;

  const { rows, count } = await EventAttendee.findAndCountAll({
    where: { eventId },
    attributes: [
      "id",
      "eventId",
      "userId",
      "userName",
      "userAvatarUrl",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  res.status(200).json({
    data: rows.map((r) => ({
      id: r.id,
      eventId: r.eventId,
      userId: r.userId,
      userName: r.userName,
      userAvatarUrl: r.userAvatarUrl,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    })),
    meta: {
      total: count,
      page,
      pageSize: limit,
      totalPages: Math.max(Math.ceil(count / limit), 1),
      hasNextPage: offset + rows.length < count,
      hasPrevPage: page > 1,
    },
  });
  return;
};

/**
 * (Optional) GET /events/:eventId/attendees/count
 * Quick count endpoint without fetching rows.
 */
export const getEventAttendeesCount: RequestHandler = async (req:Request, res:Response) => {
  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({ message: "Invalid eventId" });
    return;
  }

  const count = await EventAttendee.count({ where: { eventId } });
  res.status(200).json({ eventId, count });
  return;
};