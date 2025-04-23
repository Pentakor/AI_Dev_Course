// storage/poll.js
export const __resetStorage = () => {
  polls.clear();
};

const polls = new Map(); // key: poll.id, value: poll object

/**
 * Save a new poll to storage.
 * @param {Object} poll - The poll object to save.
 * @returns {Promise<void>}
 */
export const savePoll = async (poll) => {
  polls.set(poll.id, poll);
};

/**
 * Get a poll by its ID.
 * @param {string} id - The UUID of the poll.
 * @returns {Promise<Object|null>} The poll if found, or null.
 */
export const getPoll = async (id) => {
  return polls.get(id) || null;
};

/**
 * Delete a poll by its ID.
 * @param {string} id - The UUID of the poll.
 * @returns {Promise<boolean>} True if deleted, false if not found.
 */
export const deletePoll = async (id) => {
  return polls.delete(id);
};

/**
 * Get all polls from storage.
 * @returns {Promise<Object[]>} Array of all poll objects.
 */
export const getAllPolls = async () => {
  return Array.from(polls.values());
};

/**
 * Get all polls created by a specific user.
 * @param {string} username - The creator's username.
 * @returns {Promise<Object[]>} Array of polls created by the user.
 */
export const getPollsByCreator = async (username) => {
  return Array.from(polls.values()).filter(poll => poll.creator === username);
};
