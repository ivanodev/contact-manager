import EntityDeleteResult from "@common/entity/EntityDeleteResult";
import Model from '@infra/database/model/Model';
import DBClient from "database/DBClient";
import DBConnection from "database/DBConection";
import { ObjectId } from 'mongodb';
import DataBaseError from "./error/DataBaseError";

export default class MongoDBClientAdapter implements DBClient {

    private collectionName: string;

    constructor(readonly dbConnection: DBConnection) {

    }

    collection(collectionName: string): any {
        this.collectionName = collectionName;
        return this;
    }

    async find(query?: any): Promise<any> {
        return await this.dbConnection.collection(this.collectionName).find(query).toArray();
    }

    async findOne(query: any): Promise<any> {
        return await this.dbConnection.collection(this.collectionName).findOne(query);
    }

    async save(model: Model): Promise<Model> {

        const _id = Reflect.get(model, "_id");
        let savedResult: SavedResult | null = null;

        if (!_id) {
            savedResult = await this.insertOne(model);
        } else {
            const updateFilter = { _id: new ObjectId(_id) };
            savedResult = await this.updateOne(model, updateFilter);
        }

        let returnedModel: Model | null = null;
        let savedId: ObjectId | null = null;

        if (savedResult.acknowledged) {
            savedId = !_id ? savedResult.savedId : new ObjectId(_id);
            returnedModel = await this.dbConnection.collection(this.collectionName).findOne(savedId);
        }

        if (!returnedModel) {
            throw new DataBaseError(
                `Error while inserting a record into the collection ${this.collectionName} - data ${JSON.stringify(model)}`
            );
        }

        Reflect.set(returnedModel, "_id", savedId?.toString());

        for (const key in returnedModel) {
            const propValue: any = Reflect.get(returnedModel, key);
            Reflect.set(model, key, propValue);
        }

        return model;
    }

    async removeAll(): Promise<EntityDeleteResult> {

        const deletedResult = await this.dbConnection
            .collection(this.collectionName).deleteMany({}) as DeletedResult;

        return new EntityDeleteResult(deletedResult.deletedCount);
    }

    async removeBy(query: any): Promise<EntityDeleteResult> {

        const deletedResult = await this.dbConnection
            .collection(this.collectionName).deleteMany(query) as DeletedResult;;

        return new EntityDeleteResult(deletedResult.deletedCount);
    }

    private async insertOne(model: Model): Promise<SavedResult> {

        let insertedResult: InsertedResult | null = null;

        Reflect.set(model, "_id", new ObjectId());
        Reflect.set(model, "createdAt", new Date());

        insertedResult = await this.dbConnection
            .collection(this.collectionName).insertOne(model) as InsertedResult;

        const saveResult: SavedResult = {
            acknowledged: insertedResult.acknowledged,
            savedId: insertedResult.insertedId
        }
        
        return saveResult;
    }

    private async updateOne(model: Model, filter: object): Promise<SavedResult> {

        let updatedResult: UpdatedResult | null = null;

        Reflect.set(model, "updatedAt", new Date());

        const updateDocument = { $set: {} } as any;

        for (const key in model) {
            if (key !== '_id') {
                updateDocument.$set[key] = (model as any)[key];
            }
        }

        updatedResult = await this.dbConnection
            .collection(this.collectionName).updateOne(filter, updateDocument) as UpdatedResult;

        const saveResult: SavedResult = {
            acknowledged: updatedResult.acknowledged,
            savedId: updatedResult.upsertedId
        }

        return saveResult;
    }
}

type InsertedResult = {
    acknowledged: boolean,
    insertedId: ObjectId
}

type UpdatedResult = {
    acknowledged: boolean,
    upsertedId: ObjectId
}

type DeletedResult = {
    acknowledged: boolean,
    deletedCount: number
}

type SavedResult = {
    acknowledged: boolean,
    savedId: ObjectId
}

type User = {
    _id: string,
    name: string
}