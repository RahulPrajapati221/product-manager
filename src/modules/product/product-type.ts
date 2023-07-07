import { Document, ObjectId } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category:string;
  ratings:number;
  sellerId:ObjectId;
  createdAt: Date;
}

export interface IUserModel extends IProduct, Document {}
