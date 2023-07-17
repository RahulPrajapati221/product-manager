import { Document } from "mongoose";
import { Role } from "./enum";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserModel extends IUser, Document {}

export interface VerifyUserType {
  user: IUser;
  token: string;
}

