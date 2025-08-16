import express from "express";
import { createEvent, getAllEvents, getEventById  } from "../controllers/Event";
import { joinEvent, withdrawEvent,getMyAttendance, getEventAttendees, getEventAttendeesCount  } from "../controllers/EventAttendee";
import { requireInternalKey } from "../middlewares/requireInternalKey";
import { requireUserContext } from "../middlewares/requireUserContext";

const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getEventById/:id", getEventById);

router.post(
  "/:eventId/attendees",
  requireInternalKey,
  requireUserContext,
  joinEvent
);
router.delete(
  "/:eventId/attendees/me",
  requireInternalKey,
  requireUserContext,
  withdrawEvent
);

router.delete(
  "/:eventId/attendees/me",
  requireInternalKey,
  requireUserContext,
  withdrawEvent
);

router.get(
  "/:eventId/attendees/me",
  requireInternalKey,
  requireUserContext,
  getMyAttendance
);

router.get("/:eventId/attendees", /* requireInternalKey, requireUserContext, */ getEventAttendees);
router.get("/:eventId/attendees/count", /* requireInternalKey, requireUserContext, */ getEventAttendeesCount);

export default router;
