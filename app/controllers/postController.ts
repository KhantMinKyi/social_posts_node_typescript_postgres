import { PrismaClient } from "../../prisma/generated/client1";
import { PrismaClient as PrismaClient2 } from "../../prisma/generated/client2";
import { NextFunction, Request, Response, response } from "express";
import { validationResult } from "express-validator";
import { IPost, IPostRequest } from "../interfaces/postInterface";
import { parseBoolean } from "../services/parseBoolean";
import { readReplicas } from "@prisma/extension-read-replicas";
const postClient2 = new PrismaClient2().post;
const postClient = new PrismaClient().$extends(
  readReplicas({
    url: process.env.PSQL2_URL,
  })
);
const userSelectData = {
  id: true,
  name: true,
  email: true,
  role: true,
  varified: true,
};
const commentSelectData = {
  id: true,
  description: true,
  userId: true,
};
const selectData = {
  id: true,
  title: true,
  published: true,
  // varified: true,
  author: {
    select: userSelectData,
  },
  comments: {
    select: commentSelectData,
  },
};
// get all posts
export const getAllPost = async (req: IPostRequest, res: Response) => {
  const query = req.query;
  const queryboolean = parseBoolean(req.query.published);
  try {
    const whereConditions: any = {};
    if (query.title) {
      whereConditions.title = { contains: query.title };
    }
    if (query.published) {
      whereConditions.published = queryboolean;
    }
    const allPosts = await postClient.$primary().post.findMany({
      select: selectData,
      where: whereConditions,
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
  }
};

// get a post
export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await postClient.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: selectData,
    });
    if (!post) {
      return res.status(402).json({
        message: "Post ID : " + postId + " not Found",
      });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

// create post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  try {
    const postBody = req.body;
    const userId = (req as any).user.id;

    const post: IPost = await postClient.$primary().post.create({
      data: { authorId: userId, ...postBody },
    });
    res.status(200).json({
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

// update post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validate error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const postId = req.params.id;

  // find Post
  const post = await postClient.post.findUnique({
    where: {
      id: Number(postId),
    },
    select: selectData,
  });
  // validate if post exist
  if (!post) {
    return res.status(402).json({
      message: "Post Id : " + postId + " not found",
    });
  }
  try {
    // uppdate post
    const postUpdate = await postClient.post.update({
      where: {
        id: Number(postId),
      },
      data: req.body,
    });
    res.status(200).json(postUpdate);
  } catch (error) {
    console.log(error);
  }
};

// delete post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  const post = await postClient.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!post) {
    return res.status(402).json({
      message: "Post Id : " + postId + " Not Found",
    });
  }
  try {
    await postClient.post.delete({
      where: {
        id: Number(postId),
      },
    });
    res.status(200).json({
      message: "Post ID : " + postId + " Deleted !",
    });
  } catch (error) {
    console.log(error);
  }
};
