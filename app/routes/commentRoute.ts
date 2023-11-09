import express from "express";
import {
  createCommentValidate,
  deleteCommentValidate,
  updateCommentValidate,
} from "../validators/commentValidator";
import {
  deleteComment,
  postComment,
  updateComment,
} from "../controllers/commentController";

const router = express.Router();

router.post("/", createCommentValidate, postComment);
router.delete("/:id", deleteCommentValidate, deleteComment);
router.patch("/:id", updateCommentValidate, updateComment);

export default router;
