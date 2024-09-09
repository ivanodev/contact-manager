import { StringUtils } from "@common/utils";
import { UserId } from "type";

class Credential {

    token: string;
    userId: UserId;
    roles: string[] = [];
    readonly expireTime = 86400;// 3600;

    constructor(token: string, userId: UserId) {
        this.token = token;
        this.userId = userId;
    }

    addRole(name: string): void {
        if (StringUtils.isNull(name) || StringUtils.isEmpty(name)) return;
        if (this.roles.includes(name)) return;
        this.roles.push(name);    
    }

    addRoles(names: string[]) {
        
        names.forEach(name => {
            if (!this.roles.includes(name)) {
                this.roles.push(name); 
            }
        });
    }

}

export default Credential;