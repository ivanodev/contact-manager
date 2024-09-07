import NotFoundError from "@common/error/NotFoundError";
import UserRepository from "@domain/repository/UserRepository";

class SinginUser {

    constructor(readonly userRepository: UserRepository){}

    async execute(login: string, password: string): Promise<Boolean> {

        const user = await this.userRepository.findByLogin(login);

        if (!user) {
            throw new NotFoundError("The user could not be found");
        }

        return await user.passwordMatch(password);
    }
}

export default SinginUser;