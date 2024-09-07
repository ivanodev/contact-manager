import Credential from "@domain/entity/Credential";
import User from "@domain/entity/User";
import { v4 } from "uuid";

test("Should create new user credential valid", () => {

    const token = v4();
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole("user");
    credential.addRole("sales");

    expect(credential).toBeTruthy();
    expect(credential.roles.size).toBe(2);
});

test("Should create new user credential valid, even if empty roles are added", () => {

    const token = v4();
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole(" ");

    expect(credential).toBeTruthy();
    expect(credential.roles.size).toBe(0);
});

test("Should create a new user credential valid, even if duplicate roles are added, it should maintain only one of each", () => {

    const token = v4();
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole("user");
    credential.addRole("user");
    credential.addRole("sales");
    credential.addRole("sales");

    expect(credential).toBeTruthy();
    expect(credential.roles.size).toBe(2);
});
