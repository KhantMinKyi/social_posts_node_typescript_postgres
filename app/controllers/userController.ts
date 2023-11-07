import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { validationResult } from "express-validator";
const userClient = new PrismaClient().user;
const selectData = {
  id: true,
  name: true,
  email: true,
  role: true,
  varified: true,
};
const createToken = (name: string, email: string, id: number) => {
  return jwt.sign(
    {
      user: {
        name: name,
        email: email,
        id: id,
      },
    },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
};
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userClient.findMany({
      select: selectData,
    });
    res.status(200).json(users);
  } catch (error: any) {
    next(error.message);
  }
};
export const getuserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const user = await userClient.findUnique({
    where: {
      id: Number(userId),
    },
    select: selectData,
  });
  if (!user) {
    return res.status(402).json({
      message: "User Id : " + userId + " not Found",
    });
  }
  res.status(200).json(user);
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  const user = await userClient.findUnique({
    where: {
      email: email,
    },
    include: {
      posts: true,
    },
  });
  if (!user) {
    return res.status(402).json({ message: "Email Not Found" });
  }
  const checked = await bcrypt.compare(password, user.password);
  if (checked == false) {
    return res.status(402).json("Invalid Password");
  }
  const token = createToken(user.name, user.email, user.id);
  res.status(200).json({
    data: user,
    token: token,
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const bodyData = req.body;
  try {
    const user = await userClient.create({
      data: bodyData,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
