class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        console.log(statusCode);
    }
}
module.exports = ExpressError;