import EntityDeleteResult from "@common/entity/EntityDeleteResult";
import User from "@domain/entity/User";
import UserRepository from "@domain/repository/UserRepository";
import { COLLECTION } from "@infra/database/Collection";
import UserModel from "@infra/database/model/UserModel";
import DBClient from "database/DBClient";
import { ObjectId } from "mongodb";
import { UserId } from "type";

class MongoUserRepository implements UserRepository {

    constructor(readonly dbClient: DBClient){}

    async save(user: User): Promise<User> {

        const userModel = this.parseUserModel(user);
        const insertedResult = await this.dbClient.collection(COLLECTION.USER).save(userModel) as UserModel;
        return this.parseUserEntity(insertedResult);
    }

    async findById(userId: UserId): Promise<User | null> {

        const _id = new ObjectId(userId);
        const usersModel = await this.dbClient.collection(COLLECTION.USER).findOne({_id: _id});
        if (usersModel && usersModel.length > 0) return this.parseUserEntity(usersModel[0]);
        return null;
    }

    async findByLogin(login: string): Promise<User | null> {

        const usersModel = await this.dbClient.collection(COLLECTION.USER).findOne({login: login});
        if (usersModel) return this.parseUserEntity(usersModel);
        return null;
    }

    async removeAll(): Promise<EntityDeleteResult> {
        const deletedResult = await this.dbClient.collection(COLLECTION.USER).removeAll() as EntityDeleteResult;
        return new EntityDeleteResult(deletedResult.deletedCount);
    }

    private parseUserModel(user: User) : UserModel {
        return new UserModel(user.login, user.password, user.id);
    }

    private parseUserEntity(userModel: UserModel) : User {
        return new User(userModel.login, userModel.password, userModel._id);
    }
}

export default MongoUserRepository;