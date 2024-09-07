import ApplicationError from "@common/error/ApplicationError";
import { HttpStatus } from "@infra/http/type/HttpStatus";

class DataBaseError extends ApplicationError {

    constructor(message?: string) {
        const msg = !message ? "Database error" : message;
        super(msg);
        this.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

class DataBaseConnectionError extends DataBaseError {

    constructor(message?: string) {
        const msg = !message ? "Database error" : message;
        super(msg);
        this.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

export class DataBaseEntityNameError extends DataBaseError {

    constructor(message?: string) {
        const msg = !message ? "Database error" : message;
        super(msg);
        this.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

export class DataBaseModelError extends DataBaseError {

    constructor(message?: string) {
        const msg = !message ? "Database error" : message;
        super(msg);
        this.httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

export default DataBaseError;