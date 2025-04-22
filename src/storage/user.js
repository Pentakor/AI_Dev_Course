// storage/poll.js
export function __resetStorage() {
  users.clear();
};

// In-memory user storage using a Map
const users = new Map();

/**
 * Gets a user by username.
 * @param {string} username
 * @returns {Promise<string | undefined>}
 */
export async function getUser(username) {
  return users.get(username);
};

/**
 * Creates a new user.
 * @param {string} username
 * @returns {Promise<{ username: string }>}
 */
export async function createUser(username) {
  users.set(username, username);
  return { username };
};
