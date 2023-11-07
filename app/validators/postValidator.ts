import { body } from "express-validator";

export const validateCreatePost = [
  body("published").isBoolean().withMessage("published Shout Be boolean"),
  body("title").notEmpty().withMessage("Title cannot be Empty"),
];
export const validateUpdatePost = [
  body("published")
    .notEmpty()
    .isBoolean()
    .withMessage("published Shout Be boolean"),
  body("title").notEmpty().withMessage("Title cannot be Empty"),
];
