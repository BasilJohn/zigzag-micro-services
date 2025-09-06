// src/services/eventAttendee.service.ts
import { Event, EventAttendee } from "../models/associations";


// GET /events/:userId/getUserEventAttendance/me
export const getUserEventAttendance = async (userId: string) => {
  const rows = await EventAttendee.findAll({
    where: { userId },
    include: [
      {
        model: Event,
        as: "event",
        attributes: [
          "id",
          "title",
          "tagline",
          "date",
          "city",
          "state",
          "postalCode",
          "country",
          "latitude",
          "longitude",
        ],
      },
    ],
    order: [[{ model: Event, as: "event" }, "date", "ASC"]],
  });

  return rows;
};





