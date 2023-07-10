import { Request, Response } from "express";
import Product from "../product/product-model";
import Cart from "./cart-model";
import { errorResp, successResp } from "../../utils/response";
import { constants, errorMsg, statusCodes, successMsg } from "../../constant";

export const insertCart = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "user") {
      const product = await Product.findOne({ _id: req.params.id });
      const cart = await Cart.create({
        "items.product": product,
        userId: _id,
      });
      return successResp(resp, statusCodes.successCode, {
        data: cart,
        message: successMsg.success,
      });
    } else if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

export const userCartItem = async (req: Request, resp: Response) => {
  const { _id, role } = req.body.user;
  try {
    if (role === "user") {
      const products = await Cart.find({ userId: _id });
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
    } else if (role === "admin") {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
  } catch {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// export const cartItemById = async (req: Request, resp: Response) => {
//   const { _id, role } = req.body.user;
//   try {
//     if (role === "user") {
//       const products = await Cart.findOne({
//         userId: _id,
//         "items.product._id": req.params.id,
//       });
//       if (!products) {
//         return errorResp(
//           resp,
//           statusCodes.notFoundCode,
//           errorMsg.notFound(constants.product)
//         );
//       }
//       return successResp(resp, statusCodes.successCode, {
//         data: products,
//         message: successMsg.success,
//       });
//     } else if (role === "admin") {
//       return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
//     }
//   } catch {
//     return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
//   }
// };
