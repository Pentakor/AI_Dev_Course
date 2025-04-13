import PollsLibrary from './polls-library.js';

const myPollsLibrary = new PollsLibrary();

describe('Basic Functionality Tests', () => {
    test('Create a poll', () => {
        // Arrange
        const question = "What is your favorite programming language?";
        const options = ["JavaScript", "Python", "Java", "C++"];

        // Act
        myPollsLibrary.createPoll(question, options);

        // Assert
        expect(myPollsLibrary.getPoll(question)).toBeDefined();
    });

    test('Get a poll', () => {
        // Arrange
        const question = "What is your favorite programming language?";

        // Act
        const pollData = myPollsLibrary.getPoll(question);

        // Assert
        expect(pollData).toEqual({
            question: "What is your favorite programming language?",
            totalVotes: 0,
            results: [
                { option: "JavaScript", votes: 0 },
                { option: "Python", votes: 0 },
                { option: "Java", votes: 0 },
                { option: "C++", votes: 0 }
            ]
        });
    });

    test('Vote in a poll', () => {
        // Arrange
        const question = "What is your favorite programming language?";
        const votes = [
            "JavaScript",
            "JavaScript",
            "Python",
            "Java",
            "JavaScript",
            "Python"
        ];

        // Act
        votes.forEach(option => myPollsLibrary.vote(question, option));
        const pollData = myPollsLibrary.getPoll(question);

        // Assert
        expect(pollData).toEqual({
            question: "What is your favorite programming language?",
            totalVotes: 6,
            results: [
                { option: "JavaScript", votes: 3 },
                { option: "Python", votes: 2 },
                { option: "Java", votes: 1 },
                { option: "C++", votes: 0 }
            ]
        });
    });
});