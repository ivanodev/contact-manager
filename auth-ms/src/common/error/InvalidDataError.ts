import InternalServerErrorError from "./InternalServerErrorError";

class InvalidDataError extends InternalServerErrorError {

    constructor(readonly message: string) {
        super(message);
    }
}

export default InvalidDataError;