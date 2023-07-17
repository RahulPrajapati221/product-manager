import { Request, Response } from "express";
import { successMsg, errorMsg, statusCode, constants, alertMsg } from "../../constant";
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
import { Role } from "../users/enum";

//Create Product
export const createProduct = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { role, _id } = req.body.user;
    if (role === Role.ADMIN) {
      const reqBody = {
        ...req.body,
        sellerId: _id,
      };

      const product = await newProduct(reqBody);
      return successResp(resp, statusCode.created, {
        data: product,
        message: successMsg.created,
      });
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//Get All Products
export const getAllProduct = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const products = await allProduct();
    return successResp(resp, statusCode.success, {
      data: products,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//Get sellers Products
export const getSellerProduct = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const role = req.body.user.role;
    if (role === Role.USER) {
      return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
    }
    let sellerId;
    if (role === Role.ADMIN) {
      sellerId = req.body.user._id;
    }
    if (role === Role.SUPERADMIN) {
      sellerId = req.params.id;
    }
    const sellerProduct = await findSellerProduct(sellerId);
    return successResp(resp, statusCode.success, {
      data: sellerProduct,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// get Product by ID
export const getProductById = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const role = req.body.user.role;
    if (role === Role.USER) {
      return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
    }

    let productId;
    if (role === Role.ADMIN) {
      productId = {
        _id: req.params.id,
        sellerId: req.body.user._id,
      };
    }
    if (role === Role.SUPERADMIN) {
      productId = {
        _id: req.params.id,
      };
    }
    const Product = await findProduct(productId!);
    return successResp(resp, statusCode.success, {
      data: { Product },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// update Product
export const updateProduct = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { role, id } = req.body.user;
    if (role === Role.USER) {
      return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
    }
    const updates = req.body.update;
    const allowedUpdates = ["name", "description", "price"];
    const invalidField = validUpdate(updates, allowedUpdates);

    let productId;
    if (role === Role.ADMIN) {
      productId = {
        _id: req.params.id,
        sellerId: id,
      };
    }
    if (role === Role.SUPERADMIN) {
      productId = {
        _id: req.params.id,
      };
    }
    const product = await findProduct(productId!);
    if (!product) {
      return errorResp(
        resp,
        statusCode.notFound,
        errorMsg.notFound(constants.product)
      );
    }
    const Product = await updateProductById(productId, updates);
    return successResp(resp, statusCode.created, {
      data: { alert: alertMsg.invalidUpdate(invalidField), Product },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// delete Product
export const deleteProduct = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  const { role, id } = req.body.user;
  try {
    if (role === Role.USER) {
      return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
    }

    let productId;
    if (role === Role.ADMIN) {
      productId = {
        _id: req.params.id,
        sellerId: id,
      };
    }
    if (role === Role.SUPERADMIN) {
      productId = {
        _id: req.params.id,
      };
    }
    const deletedProduct = await deleteProductById(productId!);
    if (!deletedProduct) {
      return errorResp(
        resp,
        statusCode.notFound,
        errorMsg.notFound(constants.product)
      );
    }
    return successResp(resp, statusCode.success, {
      data: deletedProduct,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};
