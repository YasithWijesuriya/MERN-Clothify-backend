import ForbiddenError from "../../domain/errors/forbidden-error";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  const userRole = auth.sessionClaims?.metadata?.role;

  if(!userRole){
    return res.status(403).json({ message: ForbiddenError });
  }
 console.log("User authenticated:", auth.userId);
 console.log("User role:",userRole);

  next();
};



export default isAdmin;