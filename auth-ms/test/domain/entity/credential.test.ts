import Credential from "@domain/entity/Credential";
import User from "@domain/entity/User";

test("Should create new user credential valid", () => {

    const token = " c6e1215e7faa43ca83ce11013ce59c84";
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole("user");
    credential.addRole("sales");

    expect(credential).toBeTruthy();
    expect(credential.roles.length).toBe(2);
});

test("Should create new user credential valid, even if empty roles are added", () => {

    const token = " c6e1215e7faa43ca83ce11013ce59c84";
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole(" ");

    expect(credential).toBeTruthy();
    expect(credential.roles.length).toBe(0);
});

test("Should create a new user credential valid, even if duplicate roles are added, it should maintain only one of each", () => {

    const token = " c6e1215e7faa43ca83ce11013ce59c84";
    const user = new User("email@email.com", "An##3985");
    
    const credential = new Credential(token, user.id);
    credential.addRole("user");
    credential.addRole("user");
    credential.addRole("sales");
    credential.addRole("sales");

    expect(credential).toBeTruthy();
    expect(credential.roles.length).toBe(2);
});
