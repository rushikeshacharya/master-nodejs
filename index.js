import express from "express";
import path from "path";

import { connectDB } from "./utils/connection.utils.js";

//routes
import { router as urlRoute } from "./routes/url.route.js";
import { router as staticRoute } from "./routes/staticRouter.js";
import { userRoute } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import {
  checkAuthentication,
  restrictTo,
} from "./middleware/auth.middleware.js";

const app = express();
connectDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("Connected to Mongo DB");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(8000, () => {
  console.log("Server is running on 8000");
});
