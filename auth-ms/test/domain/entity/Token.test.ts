import InternalServerErrorError from "@common/error/InternalServerErrorError";
import Token from "@domain/entity/JWToken";

test("Should create token valid", () => {

    const userId = "66dc82a3dbd18ab529f29ab9";
    const userLogin = "email@email.com";

    const token = new Token(userId, userLogin);

    expect(token).toBeTruthy();
    expect(token.value).toBeTruthy();

    const decode = Token.verify(token.value);
    const { sub, login } = decode;
    expect(userId).toBe(sub);
    expect(userLogin).toBe(login);
});


test("Should throw a InternalServerErrorError for invalid userId when creating a user token", () => {

    const userLogin = "email@email.com";
    expect(() => {
        new Token(" ", userLogin);
    }).toThrowError(InternalServerErrorError);
});

test("Should throw a InternalServerErrorError for invalid login when creating a user token", () => {

    const userId = "66dc82a3dbd18ab529f29ab9";

    expect(() => {
        new Token(userId, " ");
    }).toThrowError(InternalServerErrorError);
});
