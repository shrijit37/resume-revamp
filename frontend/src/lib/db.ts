import mongoose, { Mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "";

interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

const connect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable');
    }

    cached.promise = cached.promise || mongoose.connect(MONGO_URI, {
        dbName: 'ResumeRevampUsers',
        bufferCommands: false,
        connectTimeoutMS: 30000,
    });

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connect;
