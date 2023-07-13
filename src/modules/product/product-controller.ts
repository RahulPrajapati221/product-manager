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
  sellerProducts,
} from "./product-service";
import { validUpdate } from "../../utils/validUpdateField";
import { Role } from "../users/user-type";

//Create Product
export const createProduct = async (req: Request, resp: Response) => {
  try {
    const { role, _id } = req.body.user;
    if (role === Role.USER) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const reqBody = {
      ...req.body,
      sellerId: _id,
    };

    const product = await newProduct(reqBody);
    return successResp(resp, statusCodes.createdCode, {
      data: product,
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//Get All Products
export const getAllProduct = async (req: Request, resp: Response) => {
  try {
    const products = await allProduct();
    // const { sellerId, createdAt, ...data} = products;
    return successResp(resp, statusCodes.successCode, {
      data: products,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//Get sellers Products
export const getSellerProduct = async (req: Request, resp: Response) => {
  try {
    const role = req.body.user.role;
    if (role === Role.USER) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const sellerProduct = await findSellerProduct(req.body.user._id);
    return successResp(resp, statusCodes.successCode, {
      data: sellerProduct,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// get Product by ID
export const getProductById = async (req: Request, resp: Response) => {
  try {
    const role = req.body.user.role;
    if (role === Role.ADMIN) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    if (role === Role.ADMIN) {
      const productId = {
        _id: req.params.id,
        sellerId: req.body.user._id,
      };
      const Product = await findProduct(productId);
      return successResp(resp, statusCodes.successCode, {
        data: { Product },
        message: successMsg.created,
      });
    }
    if (role === Role.SUPERADMIN) {
      const productId = {
        _id: req.params.id,
      };
      const Product = await findProduct(productId);
      return successResp(resp, statusCodes.successCode, {
        data: { Product },
        message: successMsg.created,
      });
    }
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// update Product
export const updateProduct = async (req: Request, resp: Response) => {
  try {
    const { role, id } = req.body.user;
    if (role === Role.USER) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    const updates = req.body.update;
    const allowedUpdates = ["name", "description", "price", "rating"];
    const invalidField = validUpdate(updates, allowedUpdates);
    if (role === Role.ADMIN) {
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
    }
    if (role === Role.SUPERADMIN) {
      const productId = {
        _id: req.params.id,
      };
      const product = await findProduct(productId);
      if (!product) {
        return errorResp(
          resp,
          statusCodes.notFoundCode,
          errorMsg.notFound(constants.product)
        );
      }
      const Product = await updateProductById(productId, updates);
      return successResp(resp, statusCodes.createdCode, {
        data: { alert: errorMsg.invalidUpdate(invalidField), Product },
        message: successMsg.created,
      });
    }
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// delete Product
export const deleteProduct = async (req: Request, resp: Response) => {
  const { role, id } = req.body.user;
  try {
    if (role === Role.USER) {
      return errorResp(resp, statusCodes.forbidden, errorMsg.authRole(role));
    }
    if (role === Role.ADMIN) {
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
    }
    if (role === Role.SUPERADMIN) {
      const productId = {
        _id: req.params.id,
      };
      const deletedProduct = await deleteProductById(productId);
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
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//----------------super-admin-----------------------

// get seller Product by ID --super-admin
export const productBySellerId = async (req: Request, resp: Response) => {
  try {
    const Product = await sellerProducts(req.params.id);
    return successResp(resp, statusCodes.successCode, {
      data: { Product },
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};
