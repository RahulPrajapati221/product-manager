import { Request, Response } from "express";
import { successMsg, errorMsg, statusCodes, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/response";
import {
  allProduct,
  deleteProductById,
  findProduct,
  newProduct,
  findSellerProduct,
  updateProductById,
} from "./product-service";
import { validUpdate } from "../../utils/validUpdateField";

//Create Product
export const createProduct = async (req: Request, resp: Response) => {
  try {
    const reqBody = {
      ...req.body,
      sellerId: req.body.user._id,
    };
    console.log(reqBody);
    const product = await newProduct(reqBody);
    return successResp(resp, statusCodes.createdCode, {
      data: product,
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//Get All Products----Admin
export const getAllProduct = async (req: Request, resp: Response) => {
  try {
    const role = req.body.user.role;
    const products: any = await allProduct();
    if (role === "user") {
      const { sellerId, createdAt, ...data } = products;
      return successResp(resp, statusCodes.successCode, {
        data: data,
        message: successMsg.success,
      });
    } else if (role === "admin") {
      const sellerProduct = await findSellerProduct(req.body.user._id);
      return successResp(resp, statusCodes.successCode, {
        data: sellerProduct,
        message: successMsg.success,
      });
    }
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// get Product by ID
export const getProductById = async (req: Request, resp: Response) => {
  try {
    const productId = {
      _id: req.params.id,
      sellerId: req.body.user._id,
    };
    console.log(productId);
    const Product = await findProduct(productId);
    return successResp(resp, statusCodes.successCode, {
      data: { Product },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// update Product
export const updateProduct = async (req: Request, resp: Response) => {
  const { role, id } = req.body.user;
  const updates = req.body.update;
  const allowedUpdates = ["name", "description", "price", "rating"];

  const invalidField = validUpdate(updates, allowedUpdates);
  try {
    if (role === "user") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const verifyId = {
      _id: req.params.id,
      sellerId: id,
    };
    const product = await findProduct(verifyId);
    if (!product) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.product)
      );
    }
    const Product = await updateProductById(verifyId, updates);
    return successResp(resp, statusCodes.createdCode, {
      data: { alert: errorMsg.invalidUpdate(invalidField), Product },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// delete Product
export const deleteProduct = async (req: Request, resp: Response) => {
  const { role, id } = req.body.user;
  try {
    if (role === "user") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const verifyId = {
      _id: req.params.id,
      sellerId: id,
    };
    const deletedProduct = await deleteProductById(verifyId);
    if (!deletedProduct) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.product)
      );
    }
    return successResp(resp, statusCodes.successCode, {
      data: deletedProduct,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};
