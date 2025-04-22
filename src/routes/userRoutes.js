import { Router } from 'express';
import * as userController from '../controller/userController.js';
import {usernameSchema, voteSchema} from '../validation/zodSchemas.js';
import validate from '../validation/validateMiddleware.js';

const router = Router();

// Create a new user
router.post('/', validate(usernameSchema), userController.createUser);

// Vote on a poll
router.post('/vote/:id',validate(voteSchema) ,userController.voteOnPoll);

// Get polls that the user voted in
router.get('/voted-by/:username', userController.userVotes);

export default router;