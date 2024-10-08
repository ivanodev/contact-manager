import BadRequestError from "@common/error/BadRequestError";
import { StringUtils } from "@common/utils";
import AccessUnauthenticatedError from "@infra/session/error/AccessUnauthenticatedError";
import { compare, hash } from 'bcryptjs';
import { UserId } from "type";

class User {

    id: UserId;
    login: string;
    password: string;
    roles: string[] = [];
    
    constructor(login: string, password: string, id: string = "") {
        this.checkLoginValid(login);
        this.checkPassword(password);
        this.id = id;
        this.login = login;
        this.password = password;
        Object.seal(this);
    }

    public validatePasswordChars(): void {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8}$/;
        const valid = passwordRegex.test(this.password);
        if (!valid) {
            throw new BadRequestError(
                "The password does not meet the required criteria. Please ensure it contains numbers, letters, special characters, and is between 8 characters long"
            );
        }
    }

    public async encryptPassword(): Promise<void> {
        const saltRounds = 8;
        const hashedPassword = await hash(this.password, saltRounds);
        this.password = hashedPassword;
    }

    public async passwordMatch(password: string) : Promise<Boolean> {

        const passMatch = await compare(password, this.password);

        if (!passMatch) {
            throw new AccessUnauthenticatedError("The provided user or password is incorrect");
        }

        return passMatch;
    }

    addRole(name: string): void {
        if (StringUtils.isNull(name) || StringUtils.isEmpty(name)) return;
        if (this.roles.includes(name)) return;
        this.roles.push(name);  
    }

    clearRole(name: string): void {
        if (StringUtils.isNull(name) || StringUtils.isEmpty(name)) return;
        this.roles = this.roles.filter(role => role !== name);
    }

    clearAllRoles(): void {
        this.roles = [];
    }

    private checkLoginValid(email: string): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = regex.test(email);

        if (!valid) {
            throw new BadRequestError("The email address is invalid");
        }
    }

    private checkPassword(password: string) : void {
        if (StringUtils.isEmpty(password)) {
            throw new BadRequestError(
                "The password cannot be empty or null"
            );
        }
    }
}

export default User;