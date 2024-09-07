import BadRequestError from "./BadRequestError";

class RequiredDataError extends BadRequestError {

    constructor(readonly message: string) {
        super(message);
    }
}

export default RequiredDataError;