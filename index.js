import express from "express";
import { router as urlRoute } from "./routes/url.route.js";
import { connectDB } from "./utils/connection.utils.js";

const app = express();
connectDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("Connected to Mongo DB");
});
app.use(express.json());
app.use("/url", urlRoute);
app.listen(8000, () => {
  console.log("Server is running on 8000");
});
