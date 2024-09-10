import UserRepository from "@domain/repository/UserRepository";
import SignupUser from "./SignupUser";

class RegisterAdminUser {

    constructor(readonly userRepository: UserRepository){}

    async execute(): Promise<void> {

        const email = "admin@anodos.com";
        const roles = ["admin"];
        const user = await this.userRepository.findByLogin(email);
        if (user) return;

        const siginUP = new SignupUser(this.userRepository);
        await siginUP.execute(email, "Admin#10", roles);
    }
}

export default RegisterAdminUser;