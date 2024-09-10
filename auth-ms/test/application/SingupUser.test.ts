import SingupUser from "@application/SignupUser";
import ConflictError from "@common/error/ConflictError";
import User from "@domain/entity/User";
import UserRepository from '@domain/repository/UserRepository';
import MemoryUserRepository from "@infra/database/repository/memory/MemoryUserRepository";

const userRepository: UserRepository = new MemoryUserRepository();

test("Should successfully sign up a user with valid details", async () => {

    const singupUser = new SingupUser(userRepository);
    const login = "email@email.com";
    const password = "An##3985";

    await singupUser.execute(login, password);

    const userSaved = await userRepository.findByLogin(login);
    expect(userSaved).toBeTruthy();
});

test("Should throw a ConflictError when attempting to sign up with an already existing user login", async () => {

    const login = "email@email.com";
    const password = "An##3985";
    const user = new User(login, password);
    user.encryptPassword();

    userRepository.save(user);

    const singupUser = new SingupUser(userRepository);

    let error = null;

    try {
        await singupUser.execute(login, password);
    } catch (err) {
        error = err;
    }

    expect(error).toBeInstanceOf(ConflictError);
});

afterEach(async () => {
    await userRepository.removeAll();
});