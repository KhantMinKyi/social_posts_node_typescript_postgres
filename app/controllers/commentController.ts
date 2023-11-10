import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IComment } from "../interfaces/commentInterface";

const prismaClient = new PrismaClient();
// create Comment
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
    const comment: IComment = await prismaClient.comment.create({
      data: data,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};
// delete Comment
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const data = req.body;
  const commentId = req.params.id;
  const comment: IComment = await prismaClient.comment.findFirst({
    where: {
      id: Number(commentId),
    },
    include: {
      post: true,
    },
  });
  if (!comment) {
    return res.status(402).json({
      message: "Comment id : " + commentId + " Not Found",
    });
  }
  if (data.userId == comment.userId || data.userId == comment.post.authorId) {
    try {
      await prismaClient.comment.delete({
        where: {
          id: Number(commentId),
        },
      });
      res.status(200).json({
        message: "Comment Deleted!",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(402).json({
      message: "You Cannot Delete Other Comment",
    });
  }
};

// Update Comment

export const updateComment = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const data = req.body;
  const commentId = req.params.id;
  const comment: IComment = await prismaClient.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });
  if (!comment) {
    return res.status(402).json({
      message: "Comment id : " + commentId + " Not Found",
    });
  }
  if (data.userId == comment.userId) {
    try {
      await prismaClient.comment.update({
        where: {
          id: Number(commentId),
        },
        data: data,
      });
      res.status(200).json({
        message: "Comment Updated!",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(402).json({
      message: "You Cannot Update Other Comment",
    });
  }
};
