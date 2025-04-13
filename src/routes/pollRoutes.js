import { Router } from 'express';
import * as pollController from '../controller/pollController.js';

const router = Router();

// Create a new poll
// router.post('/', pollController.createPoll);

// // Get all polls
// router.get('/', pollController.getPolls);

// // Get polls created by specific user
// router.get('/:username', pollController.getPollsByUser);

// // Delete a poll by its ID - in request body - username
// router.delete('/:id', pollController.deletePoll);

export default router;