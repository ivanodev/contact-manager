import NotFoundError from "@common/error/NotFoundError";
import Credential from "@domain/entity/Credential";
import Token from "@domain/entity/Token";
import CredentialRepository from "@domain/repository/CredentialRepository";
import UserRepository from "@domain/repository/UserRepository";

class SigninUser {

    constructor(readonly userRepository: UserRepository, 
        readonly credentialRepository: CredentialRepository){}

    async execute(login: string, password: string): Promise<String> {

        const user = await this.userRepository.findByLogin(login);

        if (!user) {
            throw new NotFoundError("The user could not be found");
        }

        await user.passwordMatch(password);

        const token = await Token.generateToken(user.id);
        const credential = new Credential(token, user.id);
        if (user.roles) credential.addRoles(user.roles);
    
        await this.credentialRepository.save(credential);
        return token;
    }
}

export default SigninUser;