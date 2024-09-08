import Credential from "@domain/entity/Credential";

interface CredentialRepository {

    save(credential: Credential): Promise<Credential>;
    findOne(token: string):Promise<Credential | null>;
    removeAll(): Promise<void>;
    removeOne(token: string): Promise<void>
}

export default CredentialRepository;