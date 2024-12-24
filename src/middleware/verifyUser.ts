import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import AuthenticatedRequest from "../types/requests/authenticatedRequest";

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers["authorization"] || "";
    if (!token) {
       res.status(401).json({ err: "Token must be provided" });
    }


    const payload = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as { userId: string; isAdmin: boolean };
    req.user = {
      userId: payload.userId,
      isAdmin: payload.isAdmin
    };
    next();
  } catch (err) {
     res.status(401).json({ error: (err as JsonWebTokenError).message });
  }
};
