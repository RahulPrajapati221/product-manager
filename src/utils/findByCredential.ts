import User from "../modules/users/user-model";
import bcrypt from "bcryptjs";
import { errorMsg, constants } from "../constant";
import { IUserModel } from "../modules/users/user-type";

export const findByCredentials = async (
  email: string,
  password: string
): Promise<IUserModel> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(errorMsg.notFound(constants.user));
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(errorMsg.loginError);
  }
  return user;
};
