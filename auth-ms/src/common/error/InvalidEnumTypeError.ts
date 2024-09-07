import BadRequestError from "./BadRequestError";

class InvalidEnumTypeError extends BadRequestError {

    constructor(readonly message: string) {
        super(message);
    }
}

export default InvalidEnumTypeError;