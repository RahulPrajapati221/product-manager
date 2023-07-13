import { Schema } from "mongoose";

export interface ICart {
  product: {
    _id: Schema.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    sellerId: Schema.Types.ObjectId;
    Quantity: number;
  };
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface VerifyIdType {
  userId: string;
  "product._id": string;
}
