import { Request, Response, NextFunction } from "express";
import { getAuth, AuthObject } from "@clerk/express";


// Custom ForbiddenError message
class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  const metadata = auth.sessionClaims?.metadata as { role?: string };
  const userRole = metadata?.role;

  if (!userRole || userRole !== "admin") {
    return res.status(403).json({ message: new ForbiddenError().message });
  }

  console.log("User authenticated:", auth.userId);
  console.log("User role:", userRole);

  next();
};

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    // Store auth data in res.locals instead of req.auth
    res.locals.auth = auth;
    
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid authentication token",
    });
  }
};
