import EnsureAuthenticated from "@application/EnsureAuthenticated";
import SignoutUser from "@application/SignoutUser";
import SinginUser from "@application/SingninUser";
import SingupUser from "@application/SingupUser";
import CredentialRepository from '@domain/repository/CredentialRepository';
import UserRepository from "@domain/repository/UserRepository";
import HttpServer from "@infra/http/HttpServer";
import { HttpMethod } from "@infra/http/type/HttpMethod";

class UserController {

    constructor(readonly httpServer: HttpServer, 
        readonly userRepository: UserRepository, 
        readonly credentialRepository: CredentialRepository) {

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/singup", 
            async function (params: any, query: any, body: any) {

            const singUpUser: SingupUser = new SingupUser(userRepository);
            const { login, password } = body;
            return await singUpUser.execute(login, password);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/singin", 
            async function (params: any, query: any, body: any) {

            const singinUser: SinginUser = new SinginUser(userRepository, credentialRepository);
            const { login, password } = body;
            return await singinUser.execute(login, password);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/singout", 
            async function (params: any, query: any, body: any) {

            const singoutUser: SignoutUser = new SignoutUser(credentialRepository);
            const { token } = body;
            return await singoutUser.execute(token);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/users/authentication", 
            async function (params: any, query: any, body: any) {

            const ensureAuthenticated: EnsureAuthenticated = new EnsureAuthenticated(credentialRepository);
            const { token } = body;
            return await ensureAuthenticated.execute(token);
        });
    }

}

export default UserController;