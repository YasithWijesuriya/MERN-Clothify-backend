// src/types/express/index.d.ts
import { AuthObject } from "@clerk/express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthObject; 
  }
}
