import EntityDeleteResult from "@common/entity/EntityDeleteResult";
import Model from "@infra/database/model/Model";

export default interface DBClient {

    collection(collectionName: string): this;
    find(query?: any): Promise<any>;
    findOne(query: any): Promise<any>;
    save(model: Model): Promise<Model>;
    removeAll(): Promise<EntityDeleteResult>;
    removeBy(query: any): Promise<EntityDeleteResult>;
}