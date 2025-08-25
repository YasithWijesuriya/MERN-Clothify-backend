import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

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
