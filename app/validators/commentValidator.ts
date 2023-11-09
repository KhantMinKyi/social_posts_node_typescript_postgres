import { body } from "express-validator";

export const createCommentValidate = [
  body("description").notEmpty().withMessage("Comment Cannot Be Empty"),
  body("userId").notEmpty().withMessage("User Id Cannot Be Empty"),
  body("postId").notEmpty().withMessage("Post Id Cannot Be Empty"),
];
export const deleteCommentValidate = [
  body("userId").notEmpty().withMessage("User Id Cannot Be Empty"),
];
export const updateCommentValidate = [
  body("description").notEmpty().withMessage("Comment Cannot Be Empty"),
  body("userId").notEmpty().withMessage("User Id Cannot Be Empty"),
];
