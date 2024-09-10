import Model from "./Model";

class UserModel extends Model {

    _id: string;
    login: string
    password: string;
    roles: string[];

    constructor(login: string, password: string, id: string = "", roles: string[]) {
        super();
        this._id = id;
        this.login = login;
        this.password = password;
        if (!roles) return;
        this.roles = roles;
    }
}

export default UserModel;