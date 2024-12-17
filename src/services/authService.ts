import { LoginDto } from "../types/dto/authDto";
import User from "../models/User"
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
      email: user.email,
    }).lean();
    if (!userFromDatabase) throw new Error("user not found");
    const match = await compare(user.password, userFromDatabase.password);
    if (!match) throw new Error("wrong password");
    // gen token
    const token = await jwt.sign(
        {
        user_id: userFromDatabase._id,
        isAdmin: userFromDatabase.isAdmin,
        username: userFromDatabase.email,
        },
        process.env.JWT_SECRET!,
        {
        expiresIn: "10m",
        }
    );
    console.log({ ...userFromDatabase, token, password: "*******" });
    return { ...userFromDatabase, token, password: "*******" };
    } catch (err) {
      console.log(err);

      throw err;
    }
}

