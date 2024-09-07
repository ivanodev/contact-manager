import { HttpStatus } from "@infra/http/type/HttpStatus";
import AuthenticationError from '@infra/session/error/AuthenticationError';

class AccessUnauthorizedError extends AuthenticationError {

    constructor(message?: string) {
        const msg = !message ? "Unauthorized user access." : message;
        super(msg, HttpStatus.FORBIDDEN);
    }
}

export default AccessUnauthorizedError;