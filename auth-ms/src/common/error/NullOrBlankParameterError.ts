import InternalServerErrorError from "./InternalServerErrorError";

class NullOrBlankParameterError extends InternalServerErrorError {

    constructor(readonly message: string) {
        super(message);
    }
}

export default NullOrBlankParameterError;