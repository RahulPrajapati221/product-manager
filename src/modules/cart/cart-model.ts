import { Schema, model } from "mongoose";
import { ICart } from "./cart-type";

const cartSchema = new Schema<ICart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
      unique: true,
    },
    Quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
