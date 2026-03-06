import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
    connectTimeoutMS: 20000,
    serverSelectionTimeoutMS: 20000,
    tls: true,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        console.log("Creating new MongoDB client...");
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect().catch(err => {
            console.error("MongoDB Initial Connection Error:", err.message);
            // Allow retry on next reload
            delete globalWithMongo._mongoClientPromise;
            throw err;
        });
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
