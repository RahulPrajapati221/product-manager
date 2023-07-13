import { IProduct } from "../product/product-type";
import Cart from "./cart-model";
import { VerifyIdType } from "./cart-type";

export const insertCartItem = async (userId: string, product: IProduct) => {
  const cart = await Cart.create({
    product,
    userId,
  });
  return cart;
};

export const getCartItem = async (userId: string) => {
  const items = await Cart.find({ userId });
  return items;
};

export const getCartItemById = async (productId: VerifyIdType) => {
  const items = await Cart.findOne(productId);
  return items;
};

export const updateCartItemById = async (
  productId: VerifyIdType,
  updates: any
) => {
  const items = await Cart.findOneAndUpdate(
    productId,
    { "product.Quantity": updates.Quantity },
    { new: true }
  );
  return items;
};

export const deleteCartItemById = async (productId: VerifyIdType) => {
  const items = await Cart.findOneAndDelete(productId);
  return items;
};
