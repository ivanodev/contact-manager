import Credential from "@domain/entity/Credential";
import CredentialRepository from "@domain/repository/CredentialRepository";
import CredentialModel from "@infra/database/model/CredentialModel";

class MemoryCredentialRepository implements CredentialRepository {

    static credentialsModel: CredentialModel[] = [];

    async save(credential: Credential): Promise<Credential> {

        const credentialModel = new CredentialModel(credential.token, credential.userId, credential.roles);

        const index = MemoryCredentialRepository.credentialsModel.findIndex(c => c.token === credential.token);

        if (index !== -1) {
            MemoryCredentialRepository.credentialsModel.splice(index, 1, credentialModel);
        } else {
            MemoryCredentialRepository.credentialsModel.push(credentialModel); 
        }

        return credential;
    }

    async findOne(token: string): Promise<Credential | null> {
        
        const credentialModel = MemoryCredentialRepository.credentialsModel.find(c => c.token === token); 

        if (credentialModel) {
            return this.parseCredential(credentialModel);
        }
    
        return null; 
    }

    async removeAll(): Promise<void> {
        MemoryCredentialRepository.credentialsModel = [];
    }

    private parseCredential(credentialModel: CredentialModel): Credential {

        const credential = new Credential(credentialModel.token, credentialModel.userId);
        if (credentialModel.roles) {
            credential.roles = new Set(credentialModel.roles);
        }
        return credential;
    } 
}

export default MemoryCredentialRepository;
