import { MongoClient, ServerApiVersion } from "mongodb";

let db;

async function connectToDb(cb) {
  try {
    const client = new MongoClient(
      `mongodb+srv://${process.env.REACT_APP_MONGO_USERNAME}:${process.env.REACT_APP_MONGO_PASSWORD}@organichomeappcluster.r2ywg.mongodb.net/organic-home-app-db?retryWrites=true&w=majority&appName=OrganicHomeAppCluster`,
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }
    );
    await client.connect();
    db = client.db("organic-home-app-db");
    cb();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cb(error);
  }
}
export { db, connectToDb };
