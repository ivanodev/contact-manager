import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class InternalServerErrorError extends ApplicationError {

    constructor(readonly message: string) {
        super(message);
        this.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

export default InternalServerErrorError;