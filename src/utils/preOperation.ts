import bcrypt from "bcryptjs";
import { IUser } from "../modules/users/user-type";

// Hash the plain text password before saving
export const encryptPass = async (update: IUser) => {
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  return update;
};
