import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const prismaClient = new PrismaClient();

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const data = req.body;
  const user = await prismaClient.user.findUnique({
    where: {
      id: data.userId,
    },
  });
  if (!user) {
    return res.status(402).json({
      message: "User Id : " + data.userId + " Not Found",
    });
  }
  const post = await prismaClient.post.findUnique({
    where: {
      id: data.postId,
    },
  });
  if (!post) {
    return res.status(402).json({
      message: "Post Id : " + data.postId + " Not Found",
    });
  }
  try {
    const comment = await prismaClient.comment.create({
      data: data,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};
