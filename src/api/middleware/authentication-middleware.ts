import { Request, Response, NextFunction } from "express";
import { getAuth, AuthObject } from "@clerk/express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      res.status(401).json({ status: "error", message: "Authentication required" });
      return; // Stop execution
    }

    req.auth = auth;
    next();
  } catch {
    res.status(401).json({ status: "error", message: "Invalid authentication token" });
  }
};
