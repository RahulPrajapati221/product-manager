import User from "./user-model";
import { generateToken } from "../../utils/generateToken";
import { findByCredentials } from "../../utils/findByCredential";
import { IUser } from "./user-type";
import { VerifyUserType } from "./user-type";

export const createUser = async (reqBody: IUser) => {
  const user = await User.create(reqBody);
  return { user };
};

export const updateUserById = async (
  user: IUser,
  reqBody: IUser
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(user, reqBody, {
    new: true,
  });
  return updatedUser;
};

export const findUser = async (
  email: string,
  password: string
): Promise<VerifyUserType> => {
  const user = await findByCredentials(email, password);
  const token = await generateToken(user);
  return { user, token };
};

export const deleteUserById = async (userId: string): Promise<IUser | null> => {
  const deletedUser = await User.findOneAndDelete({
    _id: userId,
  });
  return deletedUser;
};

export const getUsers = async () => {
  const user = await User.find();
  return user;
};

export const getUsersById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: userId });
  return user;
};
