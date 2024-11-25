import { LoginDto } from "../types/dto/authDto";
import User from "../models/userModel"
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { NewUser } from "../types/dto/userDto";


export const registerService = async (user: NewUser) => {
    try {
      if (!user.password)
        throw new Error("Missing user data, [password] is require");
      const encPass = await hash(user.password, 10);
      user.password = encPass;
      const newUser = new User(user);
      return await newUser.save();
    } catch (err) {
      console.log(err);
      throw new Error("Can't create new user");
    }
};

export const userLogin = async (user: LoginDto) => {
    try {
    const userFromDatabase = await User.findOne({
        username: user.userName,
    }).lean();
    if (!userFromDatabase) throw new Error("user not found");
    const match = await compare(user.paswword, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    // gen token
    const token = await jwt.sign(
        {
        user_id: userFromDatabase._id,
        isAdmin: userFromDatabase.isAdmin,
        username: userFromDatabase.userName,
        },
        process.env.JWT_SECRET!,
        {
        expiresIn: "10m",
        }
    );
    return { ...userFromDatabase, token, password: "*******" };
    } catch (err) {
    throw err;
    }
}

