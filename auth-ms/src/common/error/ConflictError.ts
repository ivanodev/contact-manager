import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class ConflictError extends ApplicationError {

    constructor(message?: string) {
        super(!message ? "Conflict" : message);
        this.httpStatusCode = HttpStatus.CONFLICT;
    }
}

export default ConflictError;