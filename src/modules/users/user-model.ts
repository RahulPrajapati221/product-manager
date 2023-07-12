import { Schema, model } from "mongoose";
import validator from "validator";
import { errorMsg } from "../../constant";
import { IUser } from "./user-type";
import { Role } from "./user-type";

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
      type: String,
      enum: Role,
      default: Role.USER,
      uppercase: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
