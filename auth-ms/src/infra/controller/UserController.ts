import SinginUser from "@application/SingninUser";
import SingupUser from "@application/SingupUser";
import UserRepository from "@domain/repository/UserRepository";
import HttpServer from "@infra/http/HttpServer";
import { HttpMethod } from "@infra/http/type/HttpMethod";

class UserController {

    constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository) {

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/singup", 
            async function (params: any, query: any, body: any) {

            const singUpUser: SingupUser = new SingupUser(userRepository);
            const { login, password } = body;
            return await singUpUser.execute(login, password);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/singin", 
            async function (params: any, query: any, body: any) {

            const singinUser: SinginUser = new SinginUser(userRepository);
            const { login, password } = body;
            return await singinUser.execute(login, password);
        });
    }

}

export default UserController;