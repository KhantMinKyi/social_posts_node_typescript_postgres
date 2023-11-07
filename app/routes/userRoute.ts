import express from "express";
import {
  getAllUser,
  getuserDetail,
  registerUser,
} from "../controllers/userController";
import { registerUserValidator } from "../validators/userValidator";

const router = express.Router();

router.get("/", getAllUser);
router.post("/register", registerUserValidator, registerUser);
router.get("/:id", getuserDetail);

export default router;
