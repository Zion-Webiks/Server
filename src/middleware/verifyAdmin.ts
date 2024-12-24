import { NextFunction, Request, Response } from "express";
import AuthenticatedRequest from "../types/requests/authenticatedRequest";

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
     res.status(401).json({ err: "User not found in request. Make sure verifyUser is used first." });
  }

  if (!req.user!.isAdmin) {
     res.status(403).json({ err: "Admin access required" });
  }

  next();
};
