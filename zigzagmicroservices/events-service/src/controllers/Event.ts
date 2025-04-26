import { Request, Response } from "express";
import Event from "../models";

// POST /api/v1/events/createEvent
export const createEvent = async (req: Request, res: Response) => {
    try {
      const event = await Event.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Failed to create event' });
    }
  };


// POST /api/v1/events/getAllEvents
export const getAllEvents = async (req: Request, res: Response) => {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  };
