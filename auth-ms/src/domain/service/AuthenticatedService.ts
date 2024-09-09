import Credential from "@domain/entity/Credential";
import CredentialRepository from "@domain/repository/CredentialRepository";
import AccessUnauthenticatedError from "@infra/session/error/AccessUnauthenticatedError";

class AuthenticatedService {

    constructor(readonly credentialRepository: CredentialRepository) {}

    async authenticated(token: string): Promise<Credential | null> {

        if (!token) {
            throw new AccessUnauthenticatedError();
        }

        const credential = await this.credentialRepository.findOne(token);

        if (credential == null) {
            throw new AccessUnauthenticatedError();
        }

        return credential;
    }
}

export default AuthenticatedService;