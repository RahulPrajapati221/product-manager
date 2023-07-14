import jwt from "jsonwebtoken";

export const generateToken = async (user: any): Promise<string> => {
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET as string
  );
  return token;
};
