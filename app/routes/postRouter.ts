import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "../controllers/postController";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validators/postValidator";
const router = express.Router();

// get all posts
router.get("/", getAllPost);
// create post
router.post("/", validateCreatePost, createPost);

// detail
router.get("/:id", getPostById);

// update
router.patch("/:id", validateUpdatePost, updatePost);

// delete
router.delete("/:id", deletePost);

export default router;
