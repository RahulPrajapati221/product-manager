import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
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

const Cart = model("Cart", cartSchema);

export default Cart;

//  product: {
//     // type: Schema.Types.Mixed,
//     // required: true,
//     // ref: "Cart",
//   },
