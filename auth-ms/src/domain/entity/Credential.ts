import { StringUtils } from "@common/utils";
import { UserId } from "type";

class Credential {

    token: string;
    userId: UserId;
    roles: Set<string> = new Set();
    readonly expireTime = 3600;

    constructor(token: string, userId: UserId) {
        this.token = token;
        this.userId = userId;
    }

    addRole(name: string): void {
        if (StringUtils.isNull(name) || StringUtils.isEmpty(name)) return;
        this.roles.add(name);    
    }

    addRoles(names: string[]) {
        
        names.forEach(name => {
            this.addRole(name)
        });
    }

}

export default Credential;