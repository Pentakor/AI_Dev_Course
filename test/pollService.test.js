  beforeEach(async () => {
    pollStorage.__resetStorage?.();
  });

  test('createPoll - creates poll successfully with valid input', async () => {
    const poll = await pollService.createPoll({
      creator: 'Alice',
      question: 'Favorite language?',
      options: ['JavaScript', 'Python']
    });

    expect(poll).toHaveProperty('id');
    expect(poll.creator).toBe('Alice');
    expect(poll.options.length).toBe(2);
    expect(poll.votes).toEqual({});
  });

  test('createPoll - fails if less than 2 options', async () => {
    await expect(
      pollService.createPoll({
        creator: 'Alice',
        question: 'Only one option?',
        options: ['One']
      })
    ).rejects.toThrow('At least two options are required');
  });


  test('createPoll - fails if duplicate options', async () => {
    await expect(
      pollService.createPoll({
        creator: 'Alice',
        question: 'Duplicate?',
        options: ['Same', 'Same']
      })
    ).rejects.toThrow('Duplicate options are not allowed');
  });


  test('getPolls - returns all polls', async () => {
    await pollService.createPoll({
      creator: 'Alice',
      question: 'Question 1?',
      options: ['A', 'B']
    });
    await pollService.createPoll({
      creator: 'Bob',
      question: 'Question 2?',
      options: ['X', 'Y']
    });

    const polls = await pollService.getPolls();
    expect(polls.length).toBe(2);
  });


  test('getPollsByUser - filters polls by creator', async () => {
    await pollService.createPoll({
      creator: 'Alice',
      question: 'Q1',
      options: ['1', '2']
    });
    await pollService.createPoll({
      creator: 'Bob',
      question: 'Q2',
      options: ['A', 'B']
    });

    const alicePolls = await pollService.getPollsByUser('Alice');
    expect(alicePolls.length).toBe(1);
    expect(alicePolls[0].creator).toBe('Alice');
  });


  test('getPollsByUser - fails with invalid username', async () => {
    await expect(pollService.getPollsByUser(null)).rejects.toThrow();
  });

  test('deletePoll - success if called by creator', async () => {
    const poll = await pollService.createPoll({
      creator: 'Alice',
      question: 'Delete me?',
      options: ['Yes', 'No']
    });

    await expect(pollService.deletePoll(poll.id, 'Alice')).resolves.toBeUndefined();
  });

  test('deletePoll - fails if called by non-creator', async () => {
    const poll = await pollService.createPoll({
      creator: 'Alice',
      question: 'Delete me?',
      options: ['Yes', 'No']
    });

    await expect(pollService.deletePoll(poll.id, 'Bob')).rejects.toThrow('You are not authorized to delete this poll');
  });
  test('deletePoll - fails if poll not found', async () => {
    await expect(pollService.deletePoll('non-existent-id', 'Someone')).rejects.toThrow('Poll not found');
  });
});
