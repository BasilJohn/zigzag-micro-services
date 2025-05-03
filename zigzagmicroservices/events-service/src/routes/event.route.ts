import express from 'express';
import { createEvent, getAllEvents, getEventById } from '../controllers/Event';

const router = express.Router();

router.post('/createEvent', createEvent);
router.get('/getAllEvents', getAllEvents);
router.get('/getEventById/:id', getEventById);


export default router;