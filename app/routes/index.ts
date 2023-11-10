import postRouter from "../routes/postRouter";
import userRouter from "../routes/userRoute";
import commentRouter from "../routes/commentRoute";
import { userAuth } from "../middlewares/userAuth";
import { loginUser } from "../controllers/userController";

import { loginValidator } from "../validators/userValidator";
import express from "express";
const app = express();
const router = express.Router();
app.get("/", async (req, res) => {
  res.send("home Page");
});
app.post("/api/login", loginValidator, loginUser);
app.use(router.use(userAuth));
app.use("/api/authors", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

export default app;
