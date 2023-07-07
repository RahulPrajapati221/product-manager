import {
  createUser,
  findUser,
  updateUserById,
  deleteUserById,
} from "./user-service";
import { validUpdate } from "../../utils/validUpdateField";
import { Request, Response } from "express";
import { successMsg, errorMsg, statusCodes, constants } from "../../constant";
import { successResp, errorResp } from "../../utils/response";
import User from "./user-model";

//Register user
export const registerUser = async (req: Request, resp: Response) => {
  try {
    const user = await createUser(req.body);
    return successResp(resp, statusCodes.createdCode, {
      data: user,
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

//User Login
export const loginUser = async (req: Request, resp: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await findUser(email, password);
    return successResp(resp, statusCodes.successCode, {
      data: { user, token },
      message: successMsg.login,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.unauthorizedCode, errorMsg.badRequest);
  }
};

//User profile
export const userProfile = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// logout user
export const logOutUser = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    user.tokens = user.tokens.filter((token: { token: string }) => {
      return token.token !== req.body.token;
    });
    await User.updateOne(user);
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMsg.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// logout user from all sessions
export const logOutAll = async (req: Request, resp: Response) => {
  try {
    const user = req.body.user;
    user.tokens = [];
    await user.updateOne(user);
    return successResp(resp, statusCodes.successCode, {
      data: user,
      message: successMsg.Logout,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// update user
export const updateUser = async (req: Request, resp: Response) => {
  const updates = req.body.update;
  const allowedUpdates = ["name", "email", "password", "age"];

  const invalidField = validUpdate(updates, allowedUpdates);
  try {
    const user = req.body.user;
    if (!user) {
      return errorResp(
        resp,
        statusCodes.notFoundCode,
        errorMsg.notFound(constants.user)
      );
    }
    const User = await updateUserById(user, updates);
    return successResp(resp, statusCodes.createdCode, {
      data: { Alert: errorMsg.invalidUpdate(invalidField), User },
      message: successMsg.created,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};

// delete user
export const deleteUser = async (req: Request, resp: Response) => {
  try {
    const deletedUser = await deleteUserById(req.body.user._id);
    return successResp(resp, statusCodes.successCode, {
      data: deletedUser,
      message: successMsg.success,
    });
  } catch (err) {
    return errorResp(resp, statusCodes.serverErrorCode, errorMsg.serverError);
  }
};
