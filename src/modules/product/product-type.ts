import { Document, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  ratings: number;
  quantity:number;
  available:Boolean;
  sellerId: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface IProductModel extends IProduct, Document {}
