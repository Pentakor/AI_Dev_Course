import { Router } from 'express';
import * as userController from '../controller/userController.js';
import * as pollController from '../controller/pollController.js';

const router = Router();

// Create a new user
router.post('/', userController.createUser);

// Vote on a poll
router.post('/vote/:id', userController.voteOnPoll);

// Get all votes by a user
router.get('/votes/:username', userController.userVotes);

export default router;