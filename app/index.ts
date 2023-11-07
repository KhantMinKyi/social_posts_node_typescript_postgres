import "dotenv/config";

import express from "express";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRoute";
import { userAuth } from "./middlewares/userAuth";
import { loginUser } from "./controllers/userController";
import bodyParser from "body-parser";
import { loginValidator } from "./validators/userValidator";
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("home Page");
});
app.post("/api/login", loginValidator, loginUser);
app.use(router.use(userAuth));
app.use("/api/authors", userRouter);
app.use("/api/posts", postRouter);
app.listen(process.env.PORT, () => {
  console.log("app is running");
});
