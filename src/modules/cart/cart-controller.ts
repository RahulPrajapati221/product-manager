import { Request, Response } from "express";
import Product from "../product/product-model";
import Cart from "./cart-model";
import { errorResp, successResp } from "../../utils/response";
import { constants, errorMsg, statusCodes, successMsg } from "../../constant";
import { validUpdate } from "../../utils/validUpdateField";
import { findCartItem, getCartItem, insertCartItem } from "./cart-service";

export const insertCart = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
        const product = await findCartItem(req.params.id);
        if (!product) {
          return errorResp(
            resp,
            statusCodes.notFoundCode,
            errorMsg.notFound(constants.product)
          );
        }
    const cart = await insertCartItem(_id, product);
    return successResp(resp, statusCodes.successCode, {
      data: cart,
      message: successMsg.success,
    });
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

export const userCartItem = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const products = await getCartItem(_id)
    if (!products) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.product)
      );
    }
    return successResp(resp, statusCodes.successCode, {
      data: products,
      message: successMsg.success,
    });
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

export const cartItemById = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const products = await Cart.findOne({
      userId: _id,
      "item.product._id": req.params.id,
    });
    if (!products) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.product)
      );
    }
    return successResp(resp, statusCodes.successCode, {
      data: products,
      message: successMsg.success,
    });
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

export const updateCartItem = async (req: Request, resp: Response) => {
  // try {
  const { role, _id } = req.body.user;
  if (role === "admin") {
    return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
  } else if (role === "user") {
    const updates = req.body.update;
    const allowedUpdates = ["Quantity"];
    const invalidField = validUpdate(updates, allowedUpdates);
    const verifyId = {
      userId: _id,
      "item.product._id": req.params.id,
    };
    const product = await Cart.findOne(verifyId);
    console.log(
      "🚀 ~ file: cart-controller.ts:94 ~ updateCartItem ~ product:",
      product
    );
    if (!product) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.product)
      );
    }
    const Product = await Cart.findByIdAndUpdate(verifyId, updates);
    return successResp(resp, statusCodes.createdCode, {
      data: { alert: errorMsg.invalidUpdate(invalidField), Product },
      message: successMsg.created,
    });
  }
  // } catch (err) {
  //   return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  // }
};

export const deleteCartItem = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const deletedProduct = await Cart.deleteOne({
      userId: _id,
      "item.product._id": req.params.id,
    });
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
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};
