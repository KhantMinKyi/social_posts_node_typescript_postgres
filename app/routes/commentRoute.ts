import express from "express";
import { createCommentValidate } from "../validators/commentValidator";
import { postComment } from "../controllers/commentController";

const router = express.Router();

router.post("/", createCommentValidate, postComment);

export default router;
