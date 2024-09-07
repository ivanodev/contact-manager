import UserController from "@infra/controller/UserController";
import MongoDBClientAdapter from "@infra/database/MongoDBClientAdapter";
import MongoDBConnection from "@infra/database/MongoDBConnection";
import MongoDBOptions from "@infra/database/MongoDBOptions";
import MongoUserRepository from "@infra/database/repository/database/MongoUserRepository";
import HttpServer from '@infra/http/HttpServer';
import { errorHandler } from '@infra/http/middleware/errorHandler';
import ApiStatusController from "ApiStatusController";
import DBClient from "database/DBClient";
import ExpressAdapter from './infra/http/ExpressAdapter';

const server: HttpServer = new ExpressAdapter();
server.use(errorHandler);
process.on("exit", async () => await server.stop())


async function initializeApp() {
    const dbConnection = await createDBConnection();
    const mongoDBClientAdapter: DBClient = new MongoDBClientAdapter(dbConnection);
    const userRepository = new MongoUserRepository(mongoDBClientAdapter);

    new ApiStatusController(server);
    new UserController(server, userRepository);
}


initializeApp().catch(err => {
    console.error('Error initializing the Ânodos Global Application - Authentication System', err);
    process.exit(1);
});

async function createDBConnection(): Promise<MongoDBConnection> {

    const uri = process.env.MONGO_URI as string ?? "mongodb://admin:admin@localhost:27017/auth-db?authSource=admin";
    const dbName = "auth-db";
    const minPoolSize = 5;
    const maxPoolSize = 20;
    const connectTimeoutMS = 10000;

    const mongoDBOptions = new MongoDBOptions(
        uri, dbName, minPoolSize, maxPoolSize, connectTimeoutMS
    );

    const mongoDBConnection: MongoDBConnection = new MongoDBConnection(mongoDBOptions);
    await mongoDBConnection.openConnection();

    return mongoDBConnection;
}

server.listen(4000);
