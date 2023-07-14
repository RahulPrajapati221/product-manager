import { Schema, model } from "mongoose";
import { IProduct } from "./product-type";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 6,
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
      max: 5,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
