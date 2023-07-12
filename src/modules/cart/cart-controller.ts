import { Request, Response } from "express";
import Cart from "./cart-model";
import { errorResp, successResp } from "../../utils/response";
import { constants, errorMsg, statusCodes, successMsg } from "../../constant";
import {
  deleteCartItemById,
  getCartItem,
  insertCartItem,
} from "./cart-service";
import { Role } from "../users/user-type";
import { findProduct } from "../product/product-service";

export const insertCart = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const product = await findProduct({ _id: req.params.id });
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
    }
    return errorResp(resp, statusCodes.forbidden, errorMsg.badRequest);
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

export const userCartItem = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.ADMIN) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const products = await getCartItem(_id);
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
    if (role === Role.USER) {
      const product = await Cart.findOne({
        userId: _id,
        "product._id": req.params.id,
      });
      if (!product) {
        return errorResp(
          resp,
          statusCodes.notFoundCode,
          errorMsg.notFound(constants.product)
        );
      }
      return successResp(resp, statusCodes.successCode, {
        data: product,
        message: successMsg.success,
      });
    }
    return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// export const updateCartItem = async (req: Request, resp: Response) => {
//   // try {
//     const { role, _id } = req.body.user;
//     if (role === Role.USER) {
//       const updates = req.body.update;
//       const allowedUpdates = ["Quantity"];
//       const invalidField = validUpdate(updates, allowedUpdates);
//       const verifyId = {
//         userId: _id,
//         "product._id": req.params.id,
//       };
//       // const product = await Cart.findOne(verifyId);
//       // if (!product) {
//       //   return errorResp(
//       //     resp,
//       //     statusCodes.notFoundCode,
//       //     errorMsg.notFound(constants.product)
//       //   );
//       // }
//       const Product = await Cart.findByIdAndUpdate(verifyId, updates, {
//         new: true,
//       });
//       if (!Product) {
//         return errorResp(
//           resp,
//           statusCodes.notFoundCode,
//           errorMsg.notFound(constants.product)
//         );
//       }
//       return successResp(resp, statusCodes.createdCode, {
//         data: { alert: errorMsg.invalidUpdate(invalidField), Product },
//         message: successMsg.created,
//       });
//     }
//     return errorResp(resp, statusCodes.forbidden, errorMsg.badRequest);
//   // } catch (err) {
//   //   return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
//   // }
// };

export const deleteCartItem = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === Role.USER) {
      const productId = {
        userId: _id,
        "product._id": req.params.id,
      };
      const deletedProduct = await deleteCartItemById(productId);
      // const deletedProduct = await Cart.findOneAndDelete({
      //   userId: _id,
      //   "product._id": req.params.id,
      // });
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
    }
    return errorResp(resp, statusCodes.forbidden, errorMsg.badRequest);
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};
