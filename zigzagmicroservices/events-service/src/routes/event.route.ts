import express from "express";
import { createEvent, getAllEvents, getEventById } from "../controllers/Event";
import { joinEvent, withdrawEvent } from "../controllers/EventAttendee";
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

export default router;
