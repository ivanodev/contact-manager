import ApplicationError from "@common/error/ApplicationError";
import 'express-async-errors';
import ErrorHandler from "./IErrorHandler";

export default class ExpressErrorHandler implements ErrorHandler<any> {

  public handle(err: Error, request: any, response: any, next: any) {

    if (err instanceof ApplicationError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        statusCode: err.statusCode
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error. ${err}`,
      statusCode: 500
    });
  }
}