import { User } from "../models/User"; // Ensure your model is exported as 'User' from User file
import { IUser } from "../models/User";

export class UserRepository {
  save(user: IUser) {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findByUserName(userName: string): Promise<IUser | null> {
    return User.findOne({ userName });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }
}
