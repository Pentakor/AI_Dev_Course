import { Router } from 'express';
import * as pollController from '../controller/pollController.js';
import {usernameSchema, pollSchema} from '../validation/zodSchemas.js';
import validate from '../validation/validateMiddleware.js';

const router = Router();

// Create a new poll
router.post('/', validate(pollSchema), pollController.createPoll);

// Get all polls
router.get('/', pollController.getPolls);

// Delete a poll by its ID - in request body - username
router.delete('/:id', validate(usernameSchema), pollController.deletePoll);

// Get polls created by specific user
router.get('/created-by/:username', pollController.getPollsByUser);

export default router;