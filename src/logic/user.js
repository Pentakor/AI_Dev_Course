class User {
    #username
    constructor(username) {
        this.#username = username;
    }

    get name() {
        return this.#username;
    }
}

export default User;