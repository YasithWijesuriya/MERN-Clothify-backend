import UnauthorizedError from "../../domain/errors/unauthorized-error";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";


const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ message: UnauthorizedError });
  }
  //how to use clerkClient and work with ser roles 
  // refer this and  practice it
  next();
  // console.log(auth);
  // console.log("User authenticated:", auth.userId);
};



export default isAuthenticated;