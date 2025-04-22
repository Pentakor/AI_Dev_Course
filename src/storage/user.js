// In-memory user storage using a Map
const users = new Map();

/**
 * Gets a user by username.
 * @param {string} username
 * @returns {Promise<string | undefined>}
 */
export async function getUser(username) {
  return users.get(username);
}

/**
 * Creates a new user.
 * @param {string} username
 * @returns {Promise<void>}
 */
export async function createUser(username) {
  users.set(username, username);
}

/**
 * Clears all users — used for testing.
 */
export function __resetStorage() {
  users.clear();
}
