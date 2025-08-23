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

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Authentication required'
      });
    }
    // Add user info to request object
    req.auth = auth;
    next();
  } catch (error) {
    return res.status(401).json({ 
      status: 'error',
      message: 'Invalid authentication token'
    });
  }
};



export default isAdmin;