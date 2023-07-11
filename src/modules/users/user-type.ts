import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  tokens?: { token: string }[];
}

export interface IUserModel extends IUser, Document {}

export interface VerifyUserType {
  user: IUser;
  token: string;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
  SUPERADMIN = "superAdmin",
}
