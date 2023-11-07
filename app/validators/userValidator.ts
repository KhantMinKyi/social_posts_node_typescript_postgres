import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isString()
    .isEmail()
    .withMessage("email is not validate")
    .notEmpty()
    .withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
];

export const registerUserValidator = [
  body("email")
    .isString()
    .isEmail()
    .withMessage("email is not validate")
    .notEmpty()
    .withMessage("email is required"),
  body("name").isString().notEmpty().withMessage("Name is Required"),
  body("password").notEmpty().withMessage("password is Required"),
  body("role").notEmpty().withMessage("Role is Required"),
];
