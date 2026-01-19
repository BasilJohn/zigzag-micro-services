import { Request, Response } from "express";
import Event from "../models/Events";
import { publishToQueue } from "../rabbitmq/rabbitmq";

// POST /api/v1/events/createEvent
export const createEvent = async (req: Request, res: Response) => {
  try {
    // Prepare event data with defaults for required database fields
    const eventData = {
      ...req.body,
      // Sync postCode with postalCode if postalCode is provided
      postCode: req.body.postCode || req.body.postalCode,
      postalCode: req.body.postalCode || req.body.postCode,
      // Provide defaults for shortDescription and longDescription if not provided
      shortDescription: req.body.shortDescription || req.body.description?.substring(0, 255) || req.body.title,
      longDescription: req.body.longDescription || req.body.description || '',
    };

    const event = await Event.create(eventData);

    //Send create event to notification service through message queue
    //publishToQueue(event)

    res.status(201).json(event)
  } catch (error: any) {
    console.error('Error creating event:', error);
    // Return more detailed error information
    const errorMessage = error?.message || 'Failed to create event';
    const errorDetails = error?.errors?.map((err: any) => err.message).join(', ') || errorMessage;
    res.status(500).json({ 
      message: 'Failed to create event',
      error: errorDetails,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
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