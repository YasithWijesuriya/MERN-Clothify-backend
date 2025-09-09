import { AuthObject } from "@clerk/express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthObject; 
  }
  
}
declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_SECRET_KEY: string; 
  }
}
