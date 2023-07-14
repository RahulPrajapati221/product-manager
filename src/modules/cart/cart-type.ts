import { Schema } from "mongoose";

export interface ICart {
  product: Schema.Types.ObjectId;
  Quantity: number;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
}