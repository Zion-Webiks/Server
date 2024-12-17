import { Request, Response } from "express";
import { LoginDto } from "../types/dto/authDto";
import { registerService, userLogin } from "../services/AuthService";
import { NewUser } from "../types/dto/userDto";

export const register = async (req: Request<any, any, NewUser>, res: Response) => {
  try {
    const newUser = await registerService(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};


export const login = async (req: Request<any, any, LoginDto>, res: Response) => {
    try {
      console.log(req.body);
      const loginData = await userLogin(req.body);
      res.status(201).json(loginData);
    } catch (err) {
      res.status(400).json((err as Error).message);
    }
  };

  export const logout = async (req: Request<any>, res: Response) => {
    try {
      res.status(201).json("Logout succsesfully");
    } catch (err) {
      res.status(400).json((err as Error).message);
    }
  };

  export const tokenCheck = async (req: Request<any>, res: Response) => {
    try {
      res.status(201).json("Valid User");
    } catch (err) {
      res.status(400).json((err as Error).message);
    }
  };