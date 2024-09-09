import Credential from "@domain/entity/Credential";
import CredentialRepository from "@domain/repository/CredentialRepository";
import AuthenticatedService from "@domain/service/AuthenticatedService";

class EnsureAuthenticated {

    constructor(readonly credentialRepository: CredentialRepository) {}

    async execute(token: string): Promise<Credential | null> {
        
        const authenticatedService = new AuthenticatedService(this.credentialRepository);        
        let credential = await authenticatedService.authenticated(token);
        return credential;
    }

}

export default EnsureAuthenticated;