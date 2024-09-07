import SinginUser from "@application/SingninUser";
import SingupUser from "@application/SingupUser";
import NotFoundError from "@common/error/NotFoundError";
import UserRepository from "@domain/repository/UserRepository";
import MemoryUserRepository from "@infra/database/repository/memory/MemoryUserRepository";
import AccessUnauthenticatedError from "@infra/session/error/AccessUnauthenticatedError";

const userRepository: UserRepository = new MemoryUserRepository();
const login = "email@email.com";
const password = "An##3985";

beforeEach(async () => {
    const singupUser = new SingupUser(userRepository);
    await singupUser.execute(login, password);
});

test("Should successfully sign in a user with valid details", async () => {

    const singinUser = new SinginUser(userRepository);
    const singin = await singinUser.execute(login, password);

    expect(singin).toBeTruthy();
});

test("Should throw NotFoundError when user is not found during sign-in", async () => {

    const loginNotFound = "ema@email.com"
    const singinUser = new SinginUser(userRepository);
    let error = null;

    try {
        await singinUser.execute(loginNotFound, password);
    } catch (err) {
        error = err;
    }

    expect(error).toBeInstanceOf(NotFoundError);
});

test("Should throw AccessUnauthenticatedError when the password is incorrect during sign-in", async () => {

    const passwordIncorrect = "An##3999"
    const singinUser = new SinginUser(userRepository);
    let error = null;

    try {
        await singinUser.execute(login, passwordIncorrect);
    } catch (err) {
        error = err;
    }

    expect(error).toBeInstanceOf(AccessUnauthenticatedError);
});

afterEach(async () => {
    userRepository.removeAll();
});