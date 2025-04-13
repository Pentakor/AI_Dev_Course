import Poll from './poll.js';

/**
 * A library for managing polls.
 */
class PollsLibrary {
    #polls;

    /**
     * Initializes a new instance of the PollsLibrary class.
     */
    constructor() {
        this.#polls = new Map();
    }

    /**
     * Creates a new poll with the given question and options.
     * param {string} question - The question for the poll.
     * param {string[]} options - The options for the poll.
     * throws {Error} If a poll with the same question already exists.
     */
    createPoll(question, options) {
        if (this.#polls.has(question)) {
            throw new Error("Poll with this question already exists.");
        }
        this.#polls.set(question, new Poll(question, options));
    }

    /**
     * Casts a vote for a specific option in a poll.
     * param {string} question - The question of the poll.
     * param {string} option - The option to vote for.
     * throws {Error} If the poll does not exist or the option is invalid.
     */
    vote(question, option) {
        const poll = this.#getPollByQuestion(question);
        poll.vote(option);
    }

    /**
     * Retrieves the data of a specific poll.
     * param {string} question - The question of the poll.
     * returns {Object} The data of the poll, including question, options, and votes.
     * throws {Error} If the poll does not exist.
     */
    getPoll(question) {
        const poll = this.#getPollByQuestion(question);
        return poll.getData();
    }

    /**
     * Retrieves a poll by its question.
     * private
     * param {string} question - The question of the poll.
     * returns {Poll} The poll instance.
     * throws {Error} If the poll does not exist.
     */
    #getPollByQuestion(question) {
        if (!this.#polls.has(question)) {
            throw new Error("Poll with this question does not exist.");
        }
        return this.#polls.get(question);
    }
}

export default PollsLibrary;