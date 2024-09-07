import BadRequestError from "@common/error/BadRequestError";
import User from '@domain/entity/User';
import AccessUnauthenticatedError from "@infra/session/error/AccessUnauthenticatedError";

test("Should create new user valid", () => {

    const user = new User("email@email.com", "An##3985");
    user.validatePasswordChars(); 

    expect(user).toBeTruthy();
    expect(user.login).toEqual("email@email.com");
});

test("Should create a valid new user and validate the encrypted password", async () => {

    const user = new User("email@email.com", "An##3985");
    user.validatePasswordChars(); 
    await user.encryptPassword();

    const passwordMatch = await user.passwordMatch("An##3985");

    expect(user).toBeTruthy();
    expect(passwordMatch).toBe(true);
});

test("Should throw a BadRequestError for invalid login when creating a user instance", () => {

    expect(() => {
        new User("email@email", "password");
    }).toThrowError(BadRequestError);
});

test("Should throw a BadRequestError for invalid password when creating a user instance", () => {
    
    expect(() => {
        new User("email@email.com", " ");
    }).toThrowError(BadRequestError);
});

test("Should throw a BadRequestError for an invalid password when validating the password characters", () => {
    
    expect(() => {
        const user = new User("email@email.com", "AN##3985");
        user.validatePasswordChars();
    }).toThrowError(BadRequestError);
});

test("Should throw a BadRequestError when an invalid password is provided", async () => {
    
    const user = new User("email@email.com", "An##3985");
    user.validatePasswordChars();
    await user.encryptPassword();

    let error = null;

    try {
        await user.passwordMatch("An##3999");
    } catch (err) {
        error = err;
    }

    expect(error).toBeInstanceOf(AccessUnauthenticatedError);
});