import Cart from "./cart-model";
import { ICart } from "./cart-type";

export const insertCartItem = async (
  userId: string,
  productId: string
): Promise<ICart> => {
  const cart = await Cart.create({
    product: productId,
    userId,
  });
  return cart;
};

export const getCartItem = async (userId: string): Promise<ICart[]> => {
  const items = await Cart.find({ userId }).populate("product", [
    "name",
    "description",
    "price",
    "ratings",
  ]);
  return items;
};

export const getCartItemById = async (
  productId: object
): Promise<ICart | null> => {
  const items = await Cart.findOne(productId).populate("product", [
    "name",
    "description",
    "price",
    "ratings",
  ]);
  return items;
};

export const updateCartItemById = async (
  productId: object,
  updates: ICart
): Promise<ICart | null> => {
  const items = await Cart.findOneAndUpdate(productId, updates, {
    new: true,
  }).populate("product", "name");
  return items;
};

export const deleteCartItemById = async (
  productId: object
): Promise<ICart | null> => {
  const items = await Cart.findOneAndDelete(productId);
  return items;
};

// when user deleted then delete user's cart items
export const deleteUserCartItem = async (userId: string): Promise<void> => {
  await Cart.deleteMany({ userId });
};
