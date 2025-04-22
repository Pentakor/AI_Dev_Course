import * as pollService from '../service/pollService.js';
import { getUser } from '../service/userService.js';

/**
 * Controller to handle poll creation.
 *
 * @route POST /polls
 * @param {import('express').Request} req - Express request object, expects a body with creator, question, and options.
 * @param {import('express').Response} res - Express response object used to return the created poll or an error.
 * @returns {Promise<void>}
 */
export async function createPoll(req, res) {
  try {
    const { creator, question, options } = req.body;

    const poll = await pollService.createPoll({ creator, question, options });
    res.status(201).json(poll);
  } catch (err) {
    if (err.message === "Creator does not exist") {
      res.status(404).json({ error: err.message });
    } else if (err.message.includes("required")) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Controller to get all polls.
 *
 * @route GET /polls
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object used to return the list of polls or an error.
 * @returns {Promise<void>}
 */
export async function getPolls(req, res) {
    try {
      const polls = await pollService.getPolls();
      res.status(200).json(polls);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch polls' });
    }
  };
  /**
 * Controller to get polls created by a specific user.
 *
 * @route GET /polls/created-by/:username
 * @param {import('express').Request} req - Express request object, expects a username param.
 * @param {import('express').Response} res - Express response object used to return the user's polls or an error.
 * @returns {Promise<void>}
 */
export async function getPollsByUser(req, res) {
  try {
    const { username } = req.params;

    // Check if the username exists
    const existingUser = await getUser(username);
    if (!existingUser) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const polls = await pollService.getPollsByUser(username);
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user polls' });
  }
};

/**
 * Controller to delete a poll by ID, only if requested by the creator.
 *
 * @route DELETE /polls/:id
 * @param {import('express').Request} req - Express request with param `id` and body `username`.
 * @param {import('express').Response} res - Express response object used to return success or error.
 * @returns {Promise<void>}
 */
export async function deletePoll(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
  
      await pollService.deletePoll(id, username);
      res.status(204).json({ message: 'Poll deleted successfully' });
    } catch (err) {
      res.status(403).json({ error: err.message }); // מחזיר 403 אם המשתמש לא מורשה
    }
  };