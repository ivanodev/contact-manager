import { HttpStatus } from "@infra/http/type/HttpStatus";

class ApplicationError {
  protected httpStatusCode: HttpStatus = HttpStatus.ACCEPTED.valueOf();

  constructor(readonly message: string) {
    this.message = message;
  }

  get statusCode(): number {

    return this.httpStatusCode
  }
}

export default ApplicationError;
