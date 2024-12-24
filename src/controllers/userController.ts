import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { LoginDto, NewUser } from "../types/dto/userDto";
import AuthenticatedRequest from "../types/requests/authenticatedRequest";

// Instantiate the repository and service
const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export class UserController {
  static async register(req: Request<any, any, NewUser>, res: Response) {
    try {
      const newUser: NewUser = req.body;
      const user = await userService.register(newUser);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request<any, any, LoginDto>, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await userService.login(email, password);
      res.json({ token, user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Protected endpoint (requires verifyUser middleware)
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId!; // Assuming verifyUser middleware sets req.userId
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const user = await userService.getProfile(userId);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
