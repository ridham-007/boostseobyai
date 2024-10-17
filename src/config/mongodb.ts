import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
  throw new Error("Please add your Mongo URI to .env s");
}

const uri: string = process.env.NEXT_PUBLIC_MONGODB_URL ?? "";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In production mode, it's best to not use a global variable.
client = new MongoClient(uri);
clientPromise = client.connect();


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;