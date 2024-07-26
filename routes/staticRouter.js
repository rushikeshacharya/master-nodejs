import express from "express";
import { URL } from "../models/url.schema.js";
export const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  return res.render("home", {
    urls: allUrls,
  });
});
