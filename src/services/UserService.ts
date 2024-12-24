import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { NewUser } from "../types/dto/userDto";

interface LoginResult {
  token: string;
  user: IUser;
}

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async register(newUser: NewUser): Promise<IUser> {
    // Check if userName or email is already taken
    const existingEmailUser = await this.userRepo.findByEmail(newUser.email);
    if (existingEmailUser) {
      throw new Error("Email is already in use");
    }

    const existingUserNameUser = await this.userRepo.findByUserName(newUser.userName);
    if (existingUserNameUser) {
      throw new Error("Username is already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const userData: Partial<IUser> = {
      userName: newUser.userName,
      email: newUser.email,
      password: hashedPassword,
      phone: newUser.phone,
      address: newUser.address,
      isAdmin: newUser.isAdmin ?? false,
    };

    const user = await this.userRepo.createUser(userData);
    return user;
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "your_jwt_secret", // Make sure you store secret safely
      { expiresIn: "1d" }
    );

    return { token, user };
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
