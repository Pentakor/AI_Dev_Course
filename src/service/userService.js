import * as storage from '../Storage/user.js';
import * as pollStorage from '../Storage/poll.js';
import { getPoll, savePoll } from '../Storage/poll.js';

export const getUser = async (username) => {
  return storage.getUser(username);
};

export const createUser = async (username) => {
  // Check if the user already exists
  const existingUser = await storage.getUser(username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  return storage.createUser(username);
};


export const voteOnPoll = async (id, username, optionIndex) => {
  // Validate input
  if (!id || typeof id !== 'string') {
    throw new Error("Poll ID is required and must be a string");
  }

  if (!username || typeof username !== 'string') {
    throw new Error("Username is required and must be a string");
  }

  if (typeof optionIndex !== 'number' || optionIndex < 0) {
    throw new Error("Option index is required and must be a non-negative number");
  }

  // Check if the user exists
  const user = await storage.getUser(username);
  if (!user) {
    throw new Error("User does not exist");
  }

  // Retrieve the poll
  const poll = await getPoll(id);

  if (!poll) {
    throw new Error("Poll not found");
  }

  // Check if the option index is valid
  if (optionIndex >= poll.options.length) {
    throw new Error("Invalid option index");
  }

  // Check if the user has already voted
  if (poll.votes[username] !== undefined) {
    throw new Error("User has already voted");
  }

  // Update the votes
  poll.votes[username] = optionIndex;

  // Save the updated poll
  await savePoll(poll);
  return poll;
};

export const getVotedPollsByUser = async (username) => {
  // Validate input
  if (!username || typeof username !== 'string') {
    throw new Error("Username is required and must be a string");
  }

  // Retrieve all polls
  const allPolls = await pollStorage.getAllPolls();

  // Filter polls where the user has voted
  return allPolls.filter(poll => poll.votes[username] !== undefined);
};