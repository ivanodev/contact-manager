import { UserId } from "type";
import Model from "./Model";

class CredentialModel extends Model  {

    token: string;
    userId: UserId;
    roles: string[];

    constructor(token: string, userId: UserId, roles: Set<string>) {
        super();
        this.token = token;
        this.userId = userId;
        this.roles = Array.from(roles); 
    }

}

export default CredentialModel;