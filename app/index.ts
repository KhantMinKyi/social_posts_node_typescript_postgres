import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";

import route from "./routes/index";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
app.listen(process.env.PORT, () => {
  console.log("app is running");
});
