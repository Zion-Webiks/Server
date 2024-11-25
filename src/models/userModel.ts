import { Schema, Types, Document, model } from "mongoose";
import { NewUser } from "../types/dto/userDto";

export interface IUser extends NewUser, Document {
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    unique: true,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    unique: true,
    required: true 
  },
  phone: {
    type: String,
    unique: true,
    required: false 
  },
  address: {
    type: String,
    unique: true,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true 
  }
});

export default model<IUser>("User", userSchema);
