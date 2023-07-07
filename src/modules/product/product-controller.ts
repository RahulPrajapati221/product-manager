import { Request, Response } from "express";
import { successMsg, errorMsg, statusCodes, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/response";
import {
  allProduct,
  deleteProductById,
  getSingleProduct,
  newProduct,
  updateProductById,
} from "./product-service";
import { IProduct } from "./product-type";

//Create Product
export const createProduct = async (req: Request, resp: Response) => {
  try {
    const reqBody: IProduct = req.body;
    const product = await newProduct(reqBody);
    return successResp(resp, statusCodes.createdCode, {
      data: product,
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//Get All Products----SuperAdmin
export const getAllProduct = async (req: Request, resp: Response) => {
  try {
    const products = await allProduct();
    return successResp(resp, statusCodes.successCode, {
      data: products,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// get Product by ID
export const getProductById = async (req: Request, resp: Response) => {
  try {
    const productId = req.params.id;
    const Product = await getSingleProduct(productId);
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
  try {
    const productId = req.params.id;
    const updates = req.body.update;
    const Product = await updateProductById(productId, updates);
    return successResp(resp, statusCodes.createdCode, {
      data: { Product },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// delete Product
export const deleteProduct = async (req: Request, resp: Response) => {
  try {
    const deletedProduct = await deleteProductById(req.params.id);
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
