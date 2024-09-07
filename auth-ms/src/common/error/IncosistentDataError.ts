import InternalServerErrorError from "./InternalServerErrorError";

class IncosistentDataError extends InternalServerErrorError  {

    constructor(readonly message: string) {
        super(message);
    }
}

export default IncosistentDataError;