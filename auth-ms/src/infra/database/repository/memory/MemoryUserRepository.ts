import EntityDeleteResult from "@common/entity/EntityDeleteResult";
import User from "@domain/entity/User";
import UserRepository from "@domain/repository/UserRepository";
import UserModel from "@infra/database/model/UserModel";
import { UserId } from "type";
import { v4 as uuidv4 } from "uuid";

class MemoryUserRepository implements UserRepository {

    static userModels: UserModel[] = [];

    async save(user: User): Promise<User> {

        const userModel = new UserModel(user.login, user.password, user.id, user.roles);

        const index = MemoryUserRepository.userModels.findIndex(u => u._id === user.id);

        if (index !== -1) {
            MemoryUserRepository.userModels.splice(index, 1, userModel);
        } else {
            userModel._id = uuidv4();
            MemoryUserRepository.userModels.push(userModel); 
        }

        return this.parseUser(userModel);
    }

    async findById(userId: UserId): Promise<User | null> {
        
        const userModel = MemoryUserRepository.userModels.find(user => user._id === userId); 

        if (userModel) {
            return this.parseUser(userModel);
        }
    
        return null; 
    }

    async findByLogin(login: string):Promise<User | null> {

        const userModel = MemoryUserRepository.userModels.find(user => user.login === login); 

        if (userModel) {
            return this.parseUser(userModel);
        }
    
        return null; 
    }

    async removeAll(): Promise<EntityDeleteResult> {
        const deletedResult = new EntityDeleteResult(MemoryUserRepository.userModels.length);
        MemoryUserRepository.userModels = [];
        return deletedResult;
    }

    private parseUser(userModel: UserModel): User {

        const user = new User(userModel.login, userModel.password, userModel._id);
        if (userModel.roles) {
            user.roles = userModel.roles;
        }
        return user;
    }
} 

export default MemoryUserRepository;