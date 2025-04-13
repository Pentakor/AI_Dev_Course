Name: David Weiss
ID: 325483006

# Polls Library

## Summary
This application provides a library for creating and managing polls. It allows users to:
- Create polls with a question and multiple options.
- Cast votes for specific options in a poll.
- Retrieve poll data, including the question, total votes, and voting results.

The library is implemented using two main classes:
1. `Poll`: Represents an individual poll with a question and options.
2. `PollsLibrary`: Manages multiple polls and provides methods for interacting with them.

## Design Decisions and Assumptions
1. **Handling Duplicate Polls**: 
   - A poll is uniquely identified by its question. Attempting to create a poll with the same question as an existing poll will throw an error.

2. **Handling Duplicate Options**:
   - Poll options must be unique. If duplicate options are provided during poll creation, an error will be thrown.

3. **Validation**:
   - A poll must have a non-empty question.
   - A poll must have at least two unique options.
   - Voting is only allowed for valid options in an existing poll.

4. **Private Data**:
   - The library uses private fields (e.g., `#polls`, `#options`) to encapsulate data and ensure it cannot be accessed or modified directly.

5. **Error Handling**:
   - Errors are thrown for invalid operations, such as voting on a non-existent poll or retrieving a poll that does not exist.

## Running Tests
The application includes comprehensive tests for basic functionality, edge cases, and combinations. To run the tests, use the following command:
```sh
npm test
```

## AI Tools Usage
During the development of this project, I utilized ChatGPT and GitHub Copilot for the next needs:

   - suggestions for syntax corrections.
   - debugging issues by explaining error messages and suggesting fixes.
   - writing comprehensive tests with Jest.
   - Assisted in drafting and refining documentation, including this `README.md`, to ensure clarity and completeness.