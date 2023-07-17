import { Request, Response } from "express";
import { errorResp, successResp } from "../../utils/response";
import { alertMsg, constants, errorMsg, statusCode, successMsg } from "../../constant";
import {
  deleteCartItemById,
  getCartItem,
  getCartItemById,
  insertCartItem,
  updateCartItemById,
} from "./cart-service";
import { findProduct } from "../product/product-service";
import { validUpdate } from "../../utils/validUpdateField";
import { Role } from "../users/enum";

//Insert Products In Cart
export const insertCart = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const product = await findProduct({ _id: req.params.id });
      if (!product) {
        return errorResp(
          resp,
          statusCode.notFound,
          errorMsg.notFound(constants.product)
        );
      }
      const cart = await insertCartItem(_id, req.params.id);
      return successResp(resp, statusCode.success, {
        data: cart,
        message: successMsg.success,
      });
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//get User Cart Items
export const userCartItem = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const products = await getCartItem(_id);
      if (!products) {
        return errorResp(
          resp,
          statusCode.notFound,
          errorMsg.notFound(constants.product)
        );
      }
      return successResp(resp, statusCode.success, {
        data: products,
        message: successMsg.success,
      });
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//Get Cart Item By Product Id
export const cartItemById = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const productId = {
        userId: _id,
        product: req.params.id,
      };
      const product = await getCartItemById(productId);
      if (!product) {
        return errorResp(
          resp,
          statusCode.notFound,
          errorMsg.notFound(constants.product)
        );
      }
      return successResp(resp, statusCode.success, {
        data: product,
        message: successMsg.success,
      });
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//Update Cart Item By Product Id
export const updateCartItem = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { role, _id } = req.body.user;
    if (role === Role.USER) {
      const updates = req.body.update;
      const allowedUpdates = ["Quantity"];
      const invalidField = validUpdate(updates, allowedUpdates);
      const verifyId = {
        userId: _id,
        product: req.params.id,
      };
      const Product = await updateCartItemById(verifyId, updates);
      if (!Product) {
        return errorResp(
          resp,
          statusCode.notFound,
          errorMsg.notFound(constants.product)
        );
      }
      return successResp(resp, statusCode.created, {
        data: { alert: alertMsg.invalidUpdate(invalidField), Product },
        message: successMsg.created,
      });
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//Delete Cart Item By Product Id
export const deleteCartItem = async (
  req: Request,
  resp: Response
): Promise<Response<any, Record<string, any>>> => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const productId = {
        userId: _id,
        product: req.params.id,
      };
      const deletedProduct = await deleteCartItemById(productId);
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
    }
    return errorResp(resp, statusCode.forbidden, errorMsg.forbidden);
  } catch {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};
