import { IProduct } from "./product-type";
import Product from "./product-model";

export const newProduct = async (reqBody: IProduct) => {
  const product = await Product.create(reqBody);
  return { product };
};

export const allProduct = async () => {
  const product = await Product.find();
  return { product };
};

export const getSingleProduct = async (
  ProductId: string
): Promise<IProduct | null> => {
  const updatedUser = await Product.findOne({ _id: ProductId });
  console.log("🚀 ~ file: product-service.ts:18 ~ updatedUser:", updatedUser);
  return updatedUser;
};

export const updateProductById = async (
  ProductId: string,
  reqBody: IProduct
): Promise<IProduct | null> => {
  const updatedUser = await Product.findByIdAndUpdate(
    { _id: ProductId },
    reqBody,
    {
      new: true,
    }
  );
  return updatedUser;
};

export const deleteProductById = async (
  ProductId: string
): Promise<IProduct | null> => {
  const updatedUser = await Product.findByIdAndDelete({ _id: ProductId });
  console.log("🚀 ~ file: product-service.ts:40 ~ updatedUser:", updatedUser);
  return updatedUser;
};
