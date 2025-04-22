import * as userService from '../service/userService.js';

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
