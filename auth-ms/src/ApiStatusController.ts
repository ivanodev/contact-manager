import HttpServer from "@infra/http/HttpServer";
import { HttpMethod } from "@infra/http/type/HttpMethod";

class ApiStatusController {

    constructor(readonly httpServer: HttpServer) {

        httpServer.on(HttpMethod.GET, "/anodos/contact-manager/status", async function (params: any, body: any) {
           
            return {
                service: "Ânodos Global Application - Authentication MS",
                status: "up",
                httpStatu: 200,
            };
        });
    }

}

export default ApiStatusController;