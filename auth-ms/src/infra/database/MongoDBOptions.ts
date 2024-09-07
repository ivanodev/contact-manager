export default class MongoDBOptions {

  useNewUrlParser: Boolean;
  useUnifiedTopology: Boolean;
  useFindAndModify: Boolean;
  useCreateIndex: Boolean;
  autoIndex: Boolean;

  constructor(
    readonly mongoURI: string,
    readonly dbName: string,
    readonly minPoolSize: number,
    readonly maxPoolSize: number,
    readonly connectTimeoutMS: number ) {
  }
}