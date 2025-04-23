// storage/poll.js
export const __resetStorage = () => {
  users.clear();
};

// In-memory user storage using a Map
const users = new Map();

/**
 * Gets a user by username.
 * @param {string} username
 * @returns {Promise<string | undefined>}
 */
export const getUser = async (username) => {
  return users.get(username);
};

/**
 * Creates a new user.
 * @param {string} username
 * @returns {Promise<{ username: string }>}
 */
export const createUser = async (username) => {
  users.set(username, username);
  return { username };
};
