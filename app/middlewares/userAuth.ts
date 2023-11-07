import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { IPost } from "../interfaces/postInterface";
export interface IAuthUserBody {
  name: string;
  email: string;
  id: number | Number;
}
export interface IAuthUser extends Request {
  headers: any;
  user: IAuthUserBody; // Adjust the type of userId as needed
}

export const userAuth = async (
  req: IAuthUser,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json("Authorization Header Required");
  }
  const token = authorization.split(" ")[1];
  const secret = process.env.SECRET;
  try {
    jwt.verify(token, secret, (err: any, decoded: JwtPayload | undefined) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error: any) {
    // console.log(error);
    return res.status(402).json(error.message);
  }
};
