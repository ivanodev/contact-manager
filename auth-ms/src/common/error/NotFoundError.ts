import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class NotFoundError extends ApplicationError {

    constructor(readonly message: string) {
        super(message);
        this.httpStatusCode = HttpStatus.NOT_FOUND;
    }
}

export default NotFoundError;