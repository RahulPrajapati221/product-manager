import { Schema, model } from "mongoose";
import validator from "validator";
import { errorMsg } from "../../constant";
import { IUser } from "./user-type";
import { Role } from "./enum";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error(errorMsg.invalidEmail);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error(errorMsg.passError);
        }
      },
    },
    role: {
      type: Number,
      default: Role.USER,
      required: true,
      max: 2,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
