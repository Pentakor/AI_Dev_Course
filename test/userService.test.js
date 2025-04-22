
  test('createUser - creates new user', async () => {
    const user = await userService.createUser('John Weiss');
    expect(user.username).toBe('John Weiss');
  });

  test('createUser - fails with duplicate username', async () => {
    await userService.createUser('John Weiss');
    await expect(userService.createUser('John Weiss')).rejects.toThrow('Username already exists');
  });