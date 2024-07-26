import express from "express";
import path from "path";
import { router as urlRoute } from "./routes/url.route.js";
import { connectDB } from "./utils/connection.utils.js";
import { router as staticRouter } from "./routes/staticRouter.js";

const app = express();
connectDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("Connected to Mongo DB");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRouter);
app.listen(8000, () => {
  console.log("Server is running on 8000");
});
