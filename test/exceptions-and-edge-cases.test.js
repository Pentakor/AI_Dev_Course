import PollsLibrary from './polls-library.js';

describe('Negative (Exception) Tests', () => {

    test('Invalid Vote Option', () => {
        
       // Arrange
       const myPollsLibrary = new PollsLibrary();
       const question = "What is your favorite programming language?";
       const options = ["JavaScript", "Python", "Java", "C++"];

       // Act
       myPollsLibrary.createPoll(question, options);

       // Assert
       expect(() => myPollsLibrary.vote(question, "C#")).toThrowError("Invalid option.");
    });

    test('empty question in creation', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "";
        const options = ["JavaScript", "Python", "Java", "C++"];
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("No question provided.");
 
    });

    test('No question in creation', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = null;
        const options = ["JavaScript", "Python", "Java", "C++"];
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("No question provided.");
 
    });


    test('Less than two options in creation', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = ["JavaScript"];
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("Minimum two options required.");
 
    });

    test('Empty options in creation', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = [];
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("Minimum two options required.");
 
    });

    test('No options in creation', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = null;
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("No options provided.");
 
    });

    test('Duplicate options', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = ["JavaScript", "JavaScript"];
 
        // Act and Assert 
        expect(() => myPollsLibrary.createPoll(question, options)).toThrowError("Duplicate options.");
 
    });

    test('Duplicate polls', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();

        const question1 = "What is your favorite programming language?";
        const options1 = ["JavaScript", "Python", "Java", "C++"];

        const question2 = "What is your favorite programming language?";
        const options2 = ["C#", "Rust", "Go", "Php"];
 
        // Act
        myPollsLibrary.createPoll(question1, options1);

        // Assert
        expect(() => myPollsLibrary.createPoll(question2, options2)).toThrowError("Poll with this question already exists.");
 
    });

    test('Vote on not existing poll', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = ["JavaScript", "Python", "Java", "C++"];
 
        // Act
        myPollsLibrary.createPoll(question, options);
 
        // Assert
        expect(() => myPollsLibrary.vote("What is your favorite animal?", "Python")).toThrowError("Poll with this question does not exist.");
 
    });

    test('Retrive not existing poll', () => {
        
        // Arrange
        const myPollsLibrary = new PollsLibrary();
        const question = "What is your favorite programming language?";
        const options = ["JavaScript", "Python", "Java", "C++"];
 
        // Act
        myPollsLibrary.createPoll(question, options);
 
        // Assert
        expect(() => myPollsLibrary.getPoll("What is your favorite animal?")).toThrowError("Poll with this question does not exist.");
 
    });    
});