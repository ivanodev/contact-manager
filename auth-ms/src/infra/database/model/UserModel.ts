import Model from "./Model";

class UserModel extends Model {

    _id: string;
    login: string
    password: string;

    constructor(login: string, password: string, id: string = "") {
        super("users");
        this._id = id;
        this.login = login;
        this.password = password
    }
}

export default UserModel;