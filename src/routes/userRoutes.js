import { Router } from 'express';
import * as userController from '../controller/userController.js';

const router = Router();

// Create a new user
router.post('/', userController.createUser);

// Vote on a poll
router.post('/vote/:id', userController.voteOnPoll);

// Get polls that the user voted in
router.get('/voted-by/:username', userController.userVotes);



export default router;