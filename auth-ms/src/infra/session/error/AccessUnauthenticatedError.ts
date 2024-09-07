import { HttpStatus } from "@infra/http/type/HttpStatus";
import AuthenticationError from '@infra/session/error/AuthenticationError';

class AccessUnauthenticatedError extends AuthenticationError {

    constructor(message?: string) {
        const msg = !message ? "Unauthenticated User." : message;
        super(msg, HttpStatus.UNAUTHENTICATED);
    }
}

export default AccessUnauthenticatedError;