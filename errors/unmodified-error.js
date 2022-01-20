class UnmodifiedError extends Error {
    constructor(message) {
        super(message);
        this.code = 412
    }

}

module.exports = UnmodifiedError