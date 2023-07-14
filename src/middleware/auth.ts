import jwt, { JwtPayload } from "jsonwebtoken";
import { errorMsg, constants } from "../constant";
import { Request, Response, NextFunction } from "express";
import { Role } from "../modules/users/enum";
import { getUsersById } from "../modules/users/user-service";

export const auth = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    if (req.header("Authorization")?.includes("Bearer")) {
      const token: string = req
        .header("Authorization")
        ?.replace("Bearer ", "")!;
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const user = await getUsersById(decoded._id);
      if (!user) {
        throw new Error(errorMsg.notFound(constants.user));
      }
      req.body.token = token;
      req.body.user = user;
      return next();
    } else if (req.header("Authorization")?.includes("Basic")) {
      return SuperAdmin(req, resp, next);
    }
    next(errorMsg.unauthorized);
  } catch (e) {
    resp.status(401).send({ error: errorMsg.unauthorized });
  }
};

export const SuperAdmin = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const basicAuth = req.header("Authorization")?.replace("Basic ", "")!;
    const [name, pass] = Buffer.from(basicAuth, "base64")
      .toString("ascii")
      .split(":");
    const userName = process.env.USERNAME;
    const passWord = process.env.PASSWORD;

    if (userName !== name && passWord !== pass) {
      throw new Error(errorMsg.unauthorized);
    }
    const user = {
      role: Role.SUPERADMIN,
    };
    req.body.user = user;
    next();
  } catch (e) {
    resp.status(401).send({ error: errorMsg.unauthorized });
  }
};
