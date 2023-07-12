import { IProduct } from "../product/product-type";
import Cart from "./cart-model";

export const insertCartItem = async (userId: string, product: IProduct) => {
  const cart = await Cart.create({
    product: product,
    userId,
  });
  return cart;
};

export const getCartItem = async (userId: string) => {
  const items = await Cart.find({ userId });
  return items;
};

export const deleteCartItemById = async (productId: any) => {
  const items = await Cart.findOneAndDelete(productId);
  return items;
};
