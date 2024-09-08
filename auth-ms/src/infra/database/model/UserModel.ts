import Model from "./Model";

class UserModel extends Model {

    _id: string;
    login: string
    password: string;
    roles: string[];

    constructor(login: string, password: string, id: string = "", roles: Set<string>) {
        super();
        this._id = id;
        this.login = login;
        this.password = password;
        if (!roles) return;
        this.roles = Array.from(roles);
    }
}

export default UserModel;