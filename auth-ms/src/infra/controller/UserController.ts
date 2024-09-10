import EnsureAuthenticated from "@application/EnsureAuthenticated";
import SigninUser from "@application/SigninUser";
import SignoutUser from "@application/SignoutUser";
import SingupUser from "@application/SignupUser";
import CredentialRepository from '@domain/repository/CredentialRepository';
import UserRepository from "@domain/repository/UserRepository";
import HttpServer from "@infra/http/HttpServer";
import { HttpMethod } from "@infra/http/type/HttpMethod";

class UserController {

    constructor(readonly httpServer: HttpServer, 
        readonly userRepository: UserRepository, 
        readonly credentialRepository: CredentialRepository) {

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/auths/signup", 
            async function (params: any, query: any, body: any) {

            const singUpUser: SingupUser = new SingupUser(userRepository);
            const { login, password } = body;
            return await singUpUser.execute(login, password);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/auths/signin", 
            async function (params: any, query: any, body: any) {

            const singinUser: SigninUser = new SigninUser(userRepository, credentialRepository);
            const { login, password } = body;
            return await singinUser.execute(login, password);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/auths/signout", 
            async function (params: any, query: any, body: any) {

            const singoutUser: SignoutUser = new SignoutUser(credentialRepository);
            const { token } = body;
            return await singoutUser.execute(token);
        });

        httpServer.on(HttpMethod.POST, "/anodos/contact-manager/auths/authentication", 
            async function (params: any, query: any, body: any) {

            const ensureAuthenticated: EnsureAuthenticated = new EnsureAuthenticated(credentialRepository);
            const { token } = body;
            const credential = await ensureAuthenticated.execute(token);
            return credential;
        });
    }

}

export default UserController;