import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("Doctor-Appoint");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { 
    enabled: true, 
  },
  user: {
    modelName: "users", // Map "user" to "users" collection to match your Express backend
  },
});
