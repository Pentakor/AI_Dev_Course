/**
 * E2E Tests: User and Poll Flow.
 * This suite tests the full flow from user creation to voting and deleting polls.
 * @module userPollFlow.test
 */

import axios from 'axios';
import { start, stop } from '../src/server.js';

let baseURL;

/**
 * Start the server before running the tests.
 * This function is executed before any tests are run. It starts the server 
 * and assigns the base URL to the `baseURL` variable, which will be used 
 * for making requests during the tests.
 * @function
 * @async
 */
beforeAll(async () => {
  const server = await start();
  baseURL = server.baseURL;
});

/**
 * Stop the server after all tests have been completed.
 * This function is executed after all tests are finished. It stops the server 
 * to clean up resources and free up the server for other tasks.
 * @function
 * @async
 */
afterAll(async () => {
  await stop();
});

describe('E2E: User and Poll Flow', () => {
  
  /**
   * Test: Successfully creates a new user.
   * @test
   */
  test('Create user', async () => {
    const res = await axios.post(`${baseURL}/users`, { username: 'Alice' });
    expect(res.status).toBe(201);
  });

  /**
   * Test: Successfully creates a poll for the user.
   * @test
   */
  test('Create poll', async () => {
    const res = await axios.post(`${baseURL}/polls`, {
      creator: 'Alice',
      question: 'What is your favorite programming language?',
      options: ['JavaScript', 'Python', 'Java']
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('id');
  });

  /**
   * Test: A valid user successfully votes on an existing poll.
   * @test
   */
  test('Vote on poll', async () => {
    const poll = await axios.post(`${baseURL}/polls`, {
      creator: 'Alice',
      question: 'Choose your favorite:',
      options: ['Red', 'Blue']
    });
    const pollId = poll.data.id;

    await axios.post(`${baseURL}/users`, { username: 'Bob' });

    const res = await axios.post(`${baseURL}/users/vote/${pollId}`, {
      username: 'Bob',
      optionId: 0
    });
    expect(res.status).toBe(200);
  });

  /**
   * Test: Prevents duplicate voting by the same user on the same poll.
   * @test
   */
  test('Fail on duplicate vote', async () => {
    const poll = await axios.post(`${baseURL}/polls`, {
      creator: 'Alice',
      question: 'Pick one:',
      options: ['Tea', 'Coffee']
    });
    const pollId = poll.data.id;

    await axios.post(`${baseURL}/users`, { username: 'Charlie' });

    await axios.post(`${baseURL}/users/vote/${pollId}`, {
      username: 'Charlie',
      optionId: 1
    });

    await expect(
      axios.post(`${baseURL}/users/vote/${pollId}`, {
        username: 'Charlie',
        optionId: 0
      })
    ).rejects.toThrow();
  });

  /**
   * Test: Poll creator can delete their own poll.
   * @test
   */
  test('Poll creator can delete their own poll (204)', async () => {
    await axios.post(`${baseURL}/users`, { username: 'Eli' });

    const poll = await axios.post(`${baseURL}/polls`, {
      creator: 'Eli',
      question: 'Delete this poll?',
      options: ['Yes', 'No']
    });
    const pollId = poll.data.id;

    const res = await axios.delete(`${baseURL}/polls/${pollId}`, {
      data: { username: 'Eli' }
    });

    expect(res.status).toBe(204); 
  });

  /**
   * Test: Non-creator cannot delete someone else's poll.
   * @test
   */
  test('Fail to delete poll by non-creator', async () => {
    await axios.post(`${baseURL}/users`, { username: 'Creator' });
    await axios.post(`${baseURL}/users`, { username: 'NotTheCreator' });
  
    const poll = await axios.post(`${baseURL}/polls`, {
      creator: 'Creator',
      question: 'Should this be deleted?',
      options: ['Yes', 'No']
    });
    const pollId = poll.data.id;
  
    await expect(
      axios.delete(`${baseURL}/polls/${pollId}`, {
        data: { username: 'NotTheCreator' }
      })
    ).rejects.toMatchObject({
      response: {
        status: 403
      }
    });
  });

  /**
   * Test: Get polls that a specific user has voted in.
   * @test
   */
  test('Get polls voted by user', async () => {
    const poll = await axios.post(`${baseURL}/polls`, {
      creator: 'Alice',
      question: 'Front-end framework?',
      options: ['React', 'Vue']
    });
    const pollId = poll.data.id;

    await axios.post(`${baseURL}/users`, { username: 'Dana' });

    await axios.post(`${baseURL}/users/vote/${pollId}`, {
      username: 'Dana',
      optionId: 0
    });

    const res = await axios.get(`${baseURL}/users/voted-by/Dana`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });
});
