import PollsLibrary from './polls-library.js';

const myPollsLibrary = new PollsLibrary();

describe('Combination Tests', () => {
    test('Create multiple polls', () => {
        // Arrange
        const polls = [
            {
                question: "What is your favorite programming language?",
                options: ["JavaScript", "Python", "Java", "C++"]
            },
            {
                question: "What is your favorite food?",
                options: ["Cake", "Sushi", "Burger", "Pizza"]
            },
            {
                question: "What is your favorite animal?",
                options: ["Python", "Cat", "Monkey", "Dog"]
            }
        ];

        // Act & Assert
        polls.forEach(({ question, options }) => {
            myPollsLibrary.createPoll(question, options);
            expect(myPollsLibrary.getPoll(question)).toBeDefined();
        });
    });

    test('Get the polls', () => {
        // Arrange
        const polls = [
            {
                question: "What is your favorite programming language?",
                expected: {
                    question: "What is your favorite programming language?",
                    totalVotes: 0,
                    results: [
                        { option: "JavaScript", votes: 0 },
                        { option: "Python", votes: 0 },
                        { option: "Java", votes: 0 },
                        { option: "C++", votes: 0 }
                    ]
                }
            },
            {
                question: "What is your favorite food?",
                expected: {
                    question: "What is your favorite food?",
                    totalVotes: 0,
                    results: [
                        { option: "Cake", votes: 0 },
                        { option: "Sushi", votes: 0 },
                        { option: "Burger", votes: 0 },
                        { option: "Pizza", votes: 0 }
                    ]
                }
            },
            {
                question: "What is your favorite animal?",
                expected: {
                    question: "What is your favorite animal?",
                    totalVotes: 0,
                    results: [
                        { option: "Python", votes: 0 },
                        { option: "Cat", votes: 0 },
                        { option: "Monkey", votes: 0 },
                        { option: "Dog", votes: 0 }
                    ]
                }
            }
        ];

        // Act & Assert
        polls.forEach(({ question, expected }) => {
            const pollData = myPollsLibrary.getPoll(question);
            expect(pollData).toEqual(expected);
        });
    });

    test('Vote on polls', () => {
        // Arrange
        const polls = [
            {
                question: "What is your favorite programming language?",
                votes: ["JavaScript", "JavaScript", "Python", "Java", "JavaScript", "Python"],
                expected: {
                    question: "What is your favorite programming language?",
                    totalVotes: 6,
                    results: [
                        { option: "JavaScript", votes: 3 },
                        { option: "Python", votes: 2 },
                        { option: "Java", votes: 1 },
                        { option: "C++", votes: 0 }
                    ]
                }
            },
            {
                question: "What is your favorite food?",
                votes: ["Pizza", "Burger", "Pizza", "Cake", "Pizza", "Sushi"],
                expected: {
                    question: "What is your favorite food?",
                    totalVotes: 6,
                    results: [
                        { option: "Cake", votes: 1 },
                        { option: "Sushi", votes: 1 },
                        { option: "Burger", votes: 1 },
                        { option: "Pizza", votes: 3 }
                    ]
                }
            },
            {
                question: "What is your favorite animal?",
                votes: ["Dog", "Cat", "Dog", "Monkey", "Dog", "Python"],
                expected: {
                    question: "What is your favorite animal?",
                    totalVotes: 6,
                    results: [
                        { option: "Python", votes: 1 },
                        { option: "Cat", votes: 1 },
                        { option: "Monkey", votes: 1 },
                        { option: "Dog", votes: 3 }
                    ]
                }
            }
        ];

        // Act & Assert
        polls.forEach(({ question, votes, expected }) => {
            votes.forEach(option => myPollsLibrary.vote(question, option));
            const pollData = myPollsLibrary.getPoll(question);
            expect(pollData).toEqual(expected);
        });
    });
});