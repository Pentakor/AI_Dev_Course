import * as userService from '../service/userService.js';
import * as pollService from '../service/pollService.js';

/**
 * Creates a new user.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createUser(req, res) {
  try {
    const { username } = req.body;
    const result = await userService.createUser(username);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Handles a user's vote on a poll.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function voteOnPoll(req, res) {
  try {
    const pollId = req.params.id;
    const { username, optionId } = req.body;

    const updatedPoll = await pollService.vote(pollId, username, optionId);
    res.status(200).json(updatedPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Gets all polls that the user voted in.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function userVotes(req, res) {
  try {
    const { username } = req.params;
    const polls = await userService.getVotedPollsByUser(username);
    res.status(200).json(polls);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}
