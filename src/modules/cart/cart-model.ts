import { Schema, model } from "mongoose";
import { ICart } from "./cart-type";

const cartSchema = new Schema<ICart>(
  {
    product: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
