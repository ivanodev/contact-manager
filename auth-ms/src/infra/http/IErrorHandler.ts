import HttpRequest from "./HttpRequest";

export default interface ErrorHandler<T> {

    handle(err: Error, request: HttpRequest, response: any, next: any): T;
}