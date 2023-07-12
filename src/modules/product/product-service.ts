import { IProduct } from "./product-type";
import Product from "./product-model";

export const newProduct = async (reqBody: any) => {
  const product = await Product.create(reqBody);
  return { product };
};

export const findSellerProduct = async (id: string) => {
  const product = await Product.find({ sellerId: id });
  return { product };
};

export const allProduct = async () => {
  const product = await Product.find();
  return { product };
};

export const findProduct = async (productId: any): Promise<IProduct | null> => {
  const updatedUser = await Product.findOne(productId);
  return updatedUser;
};

export const updateProductById = async (
  productId: any,
  reqBody: IProduct
): Promise<IProduct | null> => {
  const { _id, sellerId } = productId;
  const updatedUser = await Product.findByIdAndUpdate(
    { _id, sellerId },
    reqBody,
    {
      new: true,
    }
  );
  return updatedUser;
};

export const deleteProductById = async (
  productId: any
): Promise<IProduct | null> => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

// --------------super-admin---------------

export const sellerProducts = async (sellerId: string) => {
  const user = await Product.find({ sellerId });
  return user;
};
