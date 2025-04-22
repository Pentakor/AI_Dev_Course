import { v4 as uuidv4 } from 'uuid';
import {
  savePoll,
  getAllPolls,
  getPollsByCreator,
  getPoll, 
  deletePoll as deletePollFromStorage
} from '../Storage/poll.js';
import { getUser } from '../service/userService.js';

/**
 * Creates a new poll and saves it to the storage.
 *
 * @route POST /polls
 * @param {Object} pollData - The poll details.
 * @param {string} pollData.creator - The username of the poll creator.
 * @param {string} pollData.question - The poll question text.
 * @param {string[]} pollData.options - An array of answer options.
 * @returns {Promise<Object>} The created poll object with an id and empty votes.
 * @throws {Error} If validation fails or saving fails.
 */
export async function createPoll({ creator, question, options }) {
  // Extra validation (beyond Zod)
  if (!creator || typeof creator !== 'string') {
    throw new Error("Creator is required and must be a string");
  }

  // Check if the creator exists
  const existingUser = await getUser(creator);
  if (!existingUser) {
    throw new Error("Creator does not exist");
  }

  if (!question || typeof question !== 'string') {
    throw new Error("Question is required and must be a string");
  }
  if (!Array.isArray(options) || options.length < 2) {
    throw new Error("At least two options are required");
  }
  if (new Set(options).size !== options.length) {
    throw new Error("Duplicate options are not allowed");
  }

  const newPoll = {
    id: uuidv4(),
    creator,
    question,
    options,
    votes: {} // username → option index
  };

  await savePoll(newPoll);
  return newPoll;
};

/**
 * Retrieves all polls from storage.
 *
 * @route GET /polls
 * @returns {Promise<Object[]>} An array of all poll objects.
 */
export async function getPolls() {
  return await getAllPolls();
};
/**
 * Retrieves all polls created by a specific user.
 *
 * @route GET /polls/created-by/:username
 * @param {string} username - The username of the poll creator.
 * @returns {Promise<Object[]>} An array of poll objects created by the user.
 * @throws {Error} If username is missing or invalid.
 */
export async function getPollsByUser(username) {
    if (!username || typeof username !== 'string') {
      throw new Error("Username is required and must be a string");
    }
  
    return await getPollsByCreator(username);
  };
 
  /**
   * Deletes a poll by its ID if the requesting user is the creator.
   *
   * @route DELETE /polls/:id
   * @param {string} id - The UUID of the poll to delete.
   * @param {string} username - The username requesting the deletion.
   * @returns {Promise<void>}
   * @throws {Error} If poll is not found or the user is not the creator.
   */
  export async function deletePoll(id, username) {
    // Validate input
    if (!id || typeof id !== 'string') {
      throw new Error("Poll ID is required and must be a string");
    }
  
    if (!username || typeof username !== 'string') {
      throw new Error("Username is required and must be a string");
    }
  
    // Retrieve the poll
    const poll = await getPoll(id);
  
    if (!poll) {
      throw new Error("Poll not found");
    }
  
    // Only the creator is allowed to delete
    if (poll.creator !== username) {
      throw new Error("You are not authorized to delete this poll");
    }
  
    // Delete the poll from storage
    await deletePollFromStorage(id);
  };

