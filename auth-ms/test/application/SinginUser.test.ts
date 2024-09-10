import SigninUser from "@application/SigninUser";
import SingupUser from "@application/SignupUser";
import NotFoundError from "@common/error/NotFoundError";
import Token from "@domain/entity/Token";
import CredentialRepository from "@domain/repository/CredentialRepository";
import UserRepository from "@domain/repository/UserRepository";
import MemoryCredentialRepository from "@infra/database/repository/memory/MemoryCredentialRepository";
import MemoryUserRepository from "@infra/database/repository/memory/MemoryUserRepository";
import AccessUnauthenticatedError from "@infra/session/error/AccessUnauthenticatedError";

const userRepository: UserRepository = new MemoryUserRepository();
const credentialRepository: CredentialRepository = new MemoryCredentialRepository();
const login = "email@email.com";
const password = "An##3985";

beforeEach(async () => {
    const singupUser = new SingupUser(userRepository);
    const userId = await singupUser.execute(login, password);

    const user = await userRepository.findById(userId);
    if (!user) return;
    user.addRole("sales");
    user.addRole("user");
    await userRepository.save(user);    
});

test("Should successfully sign in a user with valid details", async () => {

    const singinUser = new SigninUser(userRepository, credentialRepository);
    const token = await singinUser.execute(login, password) as string;
    const user = await userRepository.findByLogin(login);
    
    expect(token).toBeTruthy();
    expect(user).not.toBeNull();
    expect(user).toBeTruthy();

    if (user) {
        await Token.verify(user.id, token);
    }

    const credential = await credentialRepository.findOne(token);
    expect(credential).toBeTruthy();
    expect(credential?.roles.length).toBe(2);
});

test("Should throw NotFoundError when user is not found during sign-in", async () => {

    const loginNotFound = "ema@email.com"
    const singinUser = new SigninUser(userRepository, credentialRepository);
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
    const singinUser = new SigninUser(userRepository, credentialRepository);
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
    credentialRepository.removeAll();
});