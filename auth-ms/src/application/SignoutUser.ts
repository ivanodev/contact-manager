import BadRequestError from "@common/error/BadRequestError";
import CredentialRepository from "@domain/repository/CredentialRepository";

class SignoutUser {

    constructor(readonly credentialRepository: CredentialRepository) {}

    async execute(token: string) {

        if (!token) {
            throw new BadRequestError("Token cannot be empty");
        }
        
        this.credentialRepository.removeOne(token);
    }
}

export default SignoutUser;