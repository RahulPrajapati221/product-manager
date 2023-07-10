import bcrypt from "bcryptjs";
import { IUser } from "../modules/users/user-type";

// Hash the plain text password before saving
export const encryptPass = async (user: IUser) => {
  user.password = await bcrypt.hash(user.password, 10);
  return user;
};
