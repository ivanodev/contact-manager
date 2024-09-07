export default interface DBConnection {

    openConnection(): Promise<void>;
    closeConnection(): Promise<void>;
    isConnected(): boolean;
    collection(collectionName: string): any;
}