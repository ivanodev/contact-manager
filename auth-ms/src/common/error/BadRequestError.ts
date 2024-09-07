import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class BadRequestError extends ApplicationError {

    constructor(message?: string) {
        super(!message ? "Bad Request" : message);
        this.httpStatusCode = HttpStatus.BAD_REQUEST;
    }
}

export default BadRequestError;