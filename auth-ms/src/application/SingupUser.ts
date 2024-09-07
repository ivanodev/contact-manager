import ConflictError from "@common/error/ConflictError";
import User from "@domain/entity/User";
import UserRepository from '@domain/repository/UserRepository';

class SingupUser {

    constructor(readonly userRepository: UserRepository){

    }

    async execute(login: string, password: string): Promise<UserId> {
        
        const user: User = new User(login, password);
        user.validatePasswordChars();
        await user.encryptPassword();

        const userExists = await this.userRepository.findByLogin(login);

        if (userExists) {
            throw new ConflictError(`User login already exists - ${login}`);
        }

        const registeredUser: User = await this.userRepository.save(user);
        return registeredUser.id;
    }
}

export default SingupUser;