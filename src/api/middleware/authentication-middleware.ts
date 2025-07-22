
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";


const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};



export default isAuthenticated;