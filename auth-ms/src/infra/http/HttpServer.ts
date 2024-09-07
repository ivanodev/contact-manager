export default interface HttpServer {
    on(method: string, url: string, callback: Function): void;
    add(req: any, res: any, next: any): void;
    listen(port: number): Promise<void>;
    stop(): Promise<void>;
    use(middleware: any): void;
}