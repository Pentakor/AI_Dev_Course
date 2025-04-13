/**
 * Represents a poll with a question and multiple options for voting.
 */
class Poll {

    #question;
    #options;
    #totalvotes;

    /**
     * Creates a new Poll instance.
     * param {string} question - The question for the poll.
     * param {string[]} options - An array of options for the poll. Must contain at least two unique options.
     * throws {Error} If no question is provided.
     * throws {Error} If no options are provided.
     * throws {Error} If fewer than two options are provided.
     * throws {Error} If duplicate options are provided.
     */
    constructor(question, options) {
        if (!question){
            throw new Error("No question provided.");
        }
        else if(!options){
            throw new Error("No options provided.");
        }
        else if(options.length < 2){
            throw new Error("Minimum two options required.");
        }
        else if (new Set(options).size !== options.length) {
            throw new Error("Duplicate options.");
        }
        else{
            this.#question = question;
            this.#options = new Map();
            this.#totalvotes = 0;
            options.forEach(option => {
                this.#options.set(option, 0);
            });
        }
    }

    /**
     * Casts a vote for a specific option.
     * param {string} option - The option to vote for.
     * throws {Error} If the option is invalid or does not exist in the poll.
     */
    vote(option) {
        if (this.#options.has(option)) {
            this.#options.set(option, this.#options.get(option) + 1);
            this.#totalvotes++;
        }
        else
        {
            throw new Error("Invalid option.");
        }
    }

    /**
     * Retrieves the poll data, including the question, total votes, and results.
     * returns {Object} An object containing the poll question, total votes, and an array of results.
     * The results array contains objects with `option` and `votes` properties.
     */
    getData() {
        return {
            question: this.#question,
            totalVotes: this.#totalvotes,
            results: [...this.#options].map(([key, value]) => ({ option: key, votes: value }))
        };
    }
}

export default Poll;
