import { hash } from "bcrypt";
import { NewUser } from "../types/dto/userDto";
import User from "../models/userModel"


  export const profileService = async (user: NewUser) => {
    try {
      console.log({ user });
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

  export const updateProfileService = async (user: any) => {
    try {
      console.log({ user });
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