import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    items: {
      product: {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
        },
        price: {
          type: String,
        },
        description: {
          type: String,
        },
        sellerId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      totalPrice: {
        type: Number,
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

const Cart = model("Cart", cartSchema);

export default Cart;
