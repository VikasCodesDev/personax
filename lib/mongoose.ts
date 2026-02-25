// lib/mongoose.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local as MONGODB_URI');
}

const URI: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global._mongoose || { conn: null, promise: null };

export async function connectMongoose(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  global._mongoose = cached;

  return cached.conn;
}