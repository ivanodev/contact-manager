import InternalServerErrorError from "@common/error/InternalServerErrorError";
import { MongoClient, MongoClientOptions } from "mongodb";
import DBConnection from "../../database/DBConection";
import MongoDBOptions from "./MongoDBOptions";

export default class MongoDBConnection implements DBConnection {

    private mongoURI: string;
    private mongoOptions: MongoClientOptions;
    private mongoClient: MongoClient;
    private connected: boolean;

    constructor(readonly mongoDBOptions: MongoDBOptions) {

        this.mongoURI = mongoDBOptions.mongoURI;

        this.mongoOptions = {
            connectTimeoutMS: mongoDBOptions.connectTimeoutMS,
            minPoolSize: mongoDBOptions.minPoolSize,
            maxPoolSize: mongoDBOptions.maxPoolSize,
            auth: {
                username: 'admin',
                password: 'admin',
            },
            authSource: 'admin',
            appName: 'Ânodos Global Application - Authentication System',
            authMechanism: 'SCRAM-SHA-1',
            waitQueueTimeoutMS: 10000
        };
    }

    async openConnection(): Promise<void> {

        this.mongoClient = new MongoClient(this.mongoURI, this.mongoOptions);

        this.mongoClient.on('close', () => {
            console.log('Disconnected from MongoDB');
            this.connected = false;
        });

        this.mongoClient.on('timeout', () => {
            console.warn('MongoDB connection timeout');
        });

        process.on('SIGINT', () => {
            this.mongoClient.close()
                .then(() => {
                    console.log('MongoDB connection closed');
                    process.exit(0);
                })
                .catch(err => {
                    console.error('Error closing the MongoDB connection:', err);
                    process.exit(1);
                });
        });

        try {
            await this.mongoClient.connect();
        } catch (err) {
            throw new InternalServerErrorError(`Unable to connect to the database -> ${err}`);
        }
        
        console.log('Connection to MongoDB established');
        this.connected = true;
    }

    isConnected(): boolean {
        return this.connected;
    }

    async closeConnection(): Promise<void> {
        this.mongoClient.close();
        this.connected = false;
    }

    collection(collectionName: string): any {
        return this.mongoClient.db(this.mongoDBOptions.dbName).collection(collectionName);
    }
}