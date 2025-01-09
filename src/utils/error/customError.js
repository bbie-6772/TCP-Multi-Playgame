class CustomError extends Error {
    constructor (code, message) {
        super(message)
        this.name = "CustomError";
        this.code = code;
    }
}

export default CustomError;