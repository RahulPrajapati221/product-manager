import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/users/user-model";
import { errorMsg, constants } from "../constant";
import { Request, Response, NextFunction } from "express";
import { errorResp } from "../utils/response";

export const auth = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.header("Authorization")?.replace("Bearer ", "")!;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error(errorMsg.notFound(constants.user));
    }
    req.body.token = token;
    req.body.user = user;
    next();
  } catch (e) {
    resp.status(401).send({ error: errorMsg.unauthorized });
  }
};

export const authRoles = (role:string) => {
  return (req:Request, resp:Response, next:NextFunction) => {
    if (!role.includes(req.body.user.role)) {
      return next(
       errorResp(
          resp,
          403,`Role: ${req.body.user.role} is not allowed to access this resource `
        )
      );
    }
    next();
  };
};