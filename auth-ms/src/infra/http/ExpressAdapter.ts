import HttpServer from "@infra/http/HttpServer";
import express from "express";
import ExpressErrorHandler from "./ExpressErrorHandler";

export default class ExpressAdapter implements HttpServer {
    private app: any;
    private port: number;
    private errorHandler: ExpressErrorHandler;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.errorHandler = new ExpressErrorHandler();
        this.app.use(function (req: any, res: any, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
    }

    private parseUrl(url: string) {
        return url.replace(/\{/g, ":").replace(/\}/g, "");
    }

    add(req: any, res: any, next: any) {
        this.app(req, res, next)
    }

    on(method: string, url: string, callback: Function): void {

        const errorHandler = this.errorHandler;
            this.app._events.request[method](this.parseUrl(url), async function (req: any, res: any, next: any) {
            try {
                const output = await callback(req, req.query, req.body, next);
                res.json(output);
            } catch (error) {
                errorHandler.handle(error as Error, req, res, next);
            }
        });
    }


    async listen(port: number): Promise<void> {
        this.port = port;
        return new Promise((resolve, reject) => {
            this.app = this.app.listen(this.port, () => {
                console.log(`🚀 Ânodos Global Application - Authentication System - Server started on port ${this.port} using Express`);
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.close(() => {
                console.log(`🚀 Ânodos Global Application - Authentication System - Server stoped on port ${this.port} using Express`);
                resolve();
            });
        });
    }

    use(handlers: any[]): void {
        this.app.use(handlers);
    }
}
