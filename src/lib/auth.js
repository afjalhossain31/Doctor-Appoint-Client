import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("Doctor-Appoint");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db),
  emailAndPassword: { 
    enabled: true, 
    // match client-side validation (minimum 6 chars)
    minPasswordLength: 6,
  },
  // allow requests from the frontend using the auth URL from .env
  trustedOrigins: process.env.BETTER_AUTH_URL
    ? [new URL(process.env.BETTER_AUTH_URL).origin]
    : ["http://localhost:3000"],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    modelName: "users",
  },
  
});
