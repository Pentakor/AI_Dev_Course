import * as userService from '../src/service/userService.js';

describe('userService (business logic)', () => {
  beforeEach(() => {
    userService.__resetStorage();
  });

  test('createUser - creates new user successfully', async () => {
    const user = await userService.createUser('adam');
    expect(user.username).toBe('adam');
  });

  test('createUser - fails with duplicate username', async () => {
    await userService.createUser('adam');
    await expect(userService.createUser('adam')).rejects.toThrow('Username already exists');
  });

  test('createUser - fails with empty username', async () => {
    await expect(userService.createUser('')).rejects.toThrow('Username is required');
  });

  test('getUser - returns user if exists', async () => {
    await userService.createUser('adam');
    const username = await userService.getUser('adam');
    expect(username).toBe('adam');
  });

  test('getUser - throws error if user not found', async () => {
    await expect(userService.getUser('ghost')).rejects.toThrow('User not found');
  });
});
