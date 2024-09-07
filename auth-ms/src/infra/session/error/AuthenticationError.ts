import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class AuthenticationError extends ApplicationError {

    constructor(readonly message: string, readonly httpStatusCode: HttpStatus) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }
}

export default AuthenticationError;