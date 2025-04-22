import * as pollService from '../src/service/pollService.js';
import * as pollStorage from '../src/storage/poll.js';

describe('pollService (business logic)', () => {
  // Reset the in-memory poll storage before each test
  beforeEach(async () => {
    pollStorage.__resetStorage?.();
  });

  // Test: create a poll with valid input
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

  // Test: fail to create a poll with less than 2 options
  test('createPoll - fails if less than 2 options', async () => {
    await expect(
      pollService.createPoll({
        creator: 'Alice',
        question: 'Only one option?',
        options: ['One']
      })
    ).rejects.toThrow('At least two options are required');
  });

  // Test: fail to create a poll with duplicate options
  test('createPoll - fails if duplicate options', async () => {
    await expect(
      pollService.createPoll({
        creator: 'Alice',
        question: 'Duplicate?',
        options: ['Same', 'Same']
      })
    ).rejects.toThrow('Duplicate options are not allowed');
  });

  // Test: return all polls
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

  // Test: return only polls created by a specific user
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

  // Test: fail to get polls when username is invalid
  test('getPollsByUser - fails with invalid username', async () => {
    await expect(pollService.getPollsByUser(null)).rejects.toThrow();
  });

  // Test: allow creator to delete a poll
  test('deletePoll - success if called by creator', async () => {
    const poll = await pollService.createPoll({
      creator: 'Alice',
      question: 'Delete me?',
      options: ['Yes', 'No']
    });

    await expect(pollService.deletePoll(poll.id, 'Alice')).resolves.toBeUndefined();
  });

  // Test: prevent non-creator from deleting a poll
  test('deletePoll - fails if called by non-creator', async () => {
    const poll = await pollService.createPoll({
      creator: 'Alice',
      question: 'Delete me?',
      options: ['Yes', 'No']
    });

    await expect(pollService.deletePoll(poll.id, 'Bob')).rejects.toThrow('You are not authorized to delete this poll');
  });

  // Test: fail to delete a poll that does not exist
  test('deletePoll - fails if poll not found', async () => {
    await expect(pollService.deletePoll('non-existent-id', 'Someone')).rejects.toThrow('Poll not found');
  });
});

// Test: vote on poll with valid user and option
test('vote - user votes successfully', async () => {
  const poll = await pollService.createPoll({
    creator: 'Alice',
    question: 'Pick a fruit',
    options: ['Apple', 'Banana']
  });

  await userService.createUser('Bob');
  const result = await pollService.vote(poll.id, 'Bob', 0);

  expect(result.votes['Bob']).toBe(0);
});

// Test: vote - prevent duplicate vote by same user
test('vote - fails on duplicate vote', async () => {
  const poll = await pollService.createPoll({
    creator: 'Alice',
    question: 'Pick a color',
    options: ['Red', 'Blue']
  });

  await userService.createUser('Charlie');
  await pollService.vote(poll.id, 'Charlie', 1);

  await expect(
    pollService.vote(poll.id, 'Charlie', 0)
  ).rejects.toThrow('User has already voted');
});

// Test: vote - fails on non-existent poll
test('vote - fails if poll not found', async () => {
  await userService.createUser('Dana');
  await expect(
    pollService.vote('invalid-poll-id', 'Dana', 0)
  ).rejects.toThrow('Poll not found');
});

// Test: vote - fails if optionId is invalid
test('vote - fails if optionId is out of range', async () => {
  const poll = await pollService.createPoll({
    creator: 'Alice',
    question: 'Choose your drink',
    options: ['Water', 'Juice']
  });

  await userService.createUser('Eve');
  await expect(
    pollService.vote(poll.id, 'Eve', 5)
  ).rejects.toThrow('Invalid option index');
});

// Test: vote - fails if username does not exist
test('vote - fails if user not found', async () => {
  const poll = await pollService.createPoll({
    creator: 'Alice',
    question: 'Choose a season',
    options: ['Summer', 'Winter']
  });

  await expect(
    pollService.vote(poll.id, 'FakeUser', 1)
  ).rejects.toThrow('User not found');
});
