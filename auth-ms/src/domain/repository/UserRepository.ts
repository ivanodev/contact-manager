import EntityDeleteResult from "@common/entity/EntityDeleteResult";
import User from "@domain/entity/User";
import { UserId } from "type";

interface UserRepository {

    save(user: User): Promise<User>;
    findById(userId: UserId):Promise<User | null>;
    findByLogin(login: string):Promise<User | null>; 
    removeAll(): Promise<EntityDeleteResult>;
}

export default UserRepository;