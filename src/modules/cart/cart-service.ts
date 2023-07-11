import Product from "../product/product-model";
import { IProduct } from "../product/product-type";
import Cart from "./cart-model";

export const findCartItem = async ( paramsId: string) => {
  const product = await Product.findOne({ _id: paramsId });
  return product;
};

export const insertCartItem = async (userId: string, product: IProduct) => {
  const cart = await Cart.create({
    "item.product": product,
    userId,
  });
  return cart;
};

export const getCartItem = async (userId: string) => {
  const items = await Cart.find({ userId });
  return items;
};

// export const getItemById = async (userId: string, paramsId: string) => {
//   const product = await Product.findOne({ _id: paramsId });
//   const cart = await Cart.create({
//     "item.product": product,
//     userId,
//   });
//   return cart;
// };
