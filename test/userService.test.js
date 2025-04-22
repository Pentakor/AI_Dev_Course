import * as userService from '../../src/service/userService.js';

describe('userService (business logic)', () => {
  // Clear the in-memory user store before each test
  beforeEach(async () => {
    userService.__resetStorage?.();
  });

  // Test: create a new user successfully
  test('createUser - creates new user', async () => {
    const user = await userService.createUser('John Weiss');
    expect(user.username).toBe('John Weiss');
  });

  // Test: fail to create user with duplicate username
  test('createUser - fails with duplicate username', async () => {
    await userService.createUser('John Weiss');
    await expect(userService.createUser('John Weiss')).rejects.toThrow('Username already exists');
  });
});
