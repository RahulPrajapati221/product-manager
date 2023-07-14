import { IProduct } from "./product-type";
import Product from "./product-model";

export const newProduct = async (reqBody: IProduct) => {
  const product = await Product.create(reqBody);
  return { product };
};

export const findSellerProduct = async (sellerId: object) => {
  const product = await Product.find({ sellerId });
  return { product };
};

export const allProduct = async () => {
  const product = await Product.find().select([
    "name",
    "description",
    "price",
    "ratings",
  ]);
  return { product };
};

export const findProduct = async (
  productId: object
): Promise<IProduct | null> => {
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
  productId: object
): Promise<IProduct | null> => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

// When seller deleted then delete Seller's Products
export const deleteSellerProduct = async (sellerId: string) => {
  const items = await Product.deleteMany({ sellerId });
};
