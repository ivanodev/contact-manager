import ExpressErrorHandler from "../ExpressErrorHandler";

export const errorHandler = ((err: Error, request: any, response: any, next: any) => {

    const errorHandler = new ExpressErrorHandler();
    errorHandler.handle(err, request, response, next);
});
