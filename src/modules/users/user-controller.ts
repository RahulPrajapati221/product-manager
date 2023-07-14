import {
  createUser,
  findUser,
  updateUserById,
  deleteUserById,
  getUsers,
  getUsersById,
} from "./user-service";
import { validUpdate } from "../../utils/validUpdateField";
import { Request, Response } from "express";
import { successMsg, errorMsg, statusCode, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/response";
import { encryptPass } from "../../utils/preOperation";
import { Role } from "./enum";
import { deleteUserCartItem } from "../cart/cart-service";
import { deleteSellerProduct } from "../product/product-service";

//Register user
export const registerUser = async (req: Request, resp: Response) => {
  try {
    const userPreData = await encryptPass(req.body);
    const user = await createUser(userPreData);
    return successResp(resp, statusCode.created, {
      data: user,
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//User Login
export const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await findUser(email, password);
    return successResp(resp, statusCode.success, {
      data: { user, token },
      message: successMsg.login,
    });
  } catch (err) {
    return errorResp(resp, statusCode.badRequest, errorMsg.badRequest);
  }
};

//User profile
export const userProfile = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    return successResp(resp, statusCode.success, {
      data: user,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// update user
export const updateUser = async (req: Request, resp: Response) => {
  const updates = req.body.update;
  const preUserData = await encryptPass(updates);
  const allowedUpdates = ["name", "email", "password", "role"];

  const invalidField = validUpdate(updates, allowedUpdates);
  try {
    const user = req.body.user;
    if (!user) {
      return errorResp(
        resp,
        statusCode.notFound,
        errorMsg.notFound(constants.user)
      );
    }
    const User = await updateUserById(user, preUserData);
    return successResp(resp, statusCode.created, {
      data: { Alert: errorMsg.invalidUpdate(invalidField), User },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// delete user
export const deleteUser = async (req: Request, resp: Response) => {
  try {
    const role = req.body.user.role;
    let userId;
    if (role === Role.USER || Role.ADMIN) {
      userId = req.body.user._id;
    }
    if (role === Role.SUPERADMIN) {
      userId = req.params.id;
    }
    const deletedUser = await deleteUserById(userId);
    await deleteUserCartItem(userId);
    await deleteSellerProduct(userId);
    return successResp(resp, statusCode.success, {
      data: deletedUser,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

//-------------super-admin-----------------

// get all users --Admin
export const allUsers = async (req: Request, resp: Response) => {
  try {
    const users = await getUsers();
    return successResp(resp, statusCode.success, {
      data: users,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};

// get users by Id --Admin
export const getUserById = async (req: Request, resp: Response) => {
  try {
    const user = await getUsersById(req.params.id);
    return successResp(resp, statusCode.success, {
      data: user,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCode.serverError, errorMsg.serverError);
  }
};
