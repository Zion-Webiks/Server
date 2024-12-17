import { Request, Response } from "express";
import { NewUser } from "../types/dto/userDto";
import { profileService, updateProfileService } from "../services/UerService";


  export const profile = async (req: Request<any>, res: Response) => {
    try {
      const userProfile = await profileService(req.body);
      res.status(201).json(userProfile);
    } catch (err) {
      res.status(400).json((err as Error).message);
    }
  };

  export const updateProfile = async (req: Request<any>, res: Response) => {
    try {
      const userProfile = await updateProfileService(req.body);
      res.status(201).json(userProfile);
    } catch (err) {
      res.status(400).json((err as Error).message);
    }
  };