import { Schema, Document, model } from "mongoose";
import { NewUser } from "../types/dto/userDto";

export interface IUser extends NewUser, Document {
}

const userSchema = new Schema<IUser>({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  isAdmin: { type: Boolean, default: false, required: true },
  balance: { type: Number, required: false }

});

export const User = model<IUser>("User", userSchema);
