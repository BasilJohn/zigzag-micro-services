import { Request, Response } from "express";
import { Booking, Event } from "../models";
import { publishToQueue } from "../rabbitmq/rabbitmq";

// POST /api/v1/events/createEvent
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);

    //Send create event to notification service through message queue
    //publishToQueue(event)

    res.status(201).json(event)
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};


// GET /api/v1/events/getAllEvents
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};


// GET /api/v1/events/getEvent/:id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

// POST /api/v1/events/bookEvent
export const bookEvent = async (req: Request, res: Response) => {
  try {
    const { event_id, user_id, user_name, email } = req.body;

    if (!event_id || !user_id || !user_name || !email) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const event = await Event.findByPk(event_id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const existingBooking = await Booking.findOne({ where: { user_id } });
    if (existingBooking) {
      res.status(400).json({ message: 'User has already booked this event' });
      return;
    }

    const booking = await Booking.create({ event_id, user_id, user_name, email });
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ message: 'Failed to book event' });
  }
};
