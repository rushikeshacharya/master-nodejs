import express from "express";
import { handleGnerateNewURL,handleRedirectURL,handleURLAnalytics } from "../controller/url.controller.js";
export const router = express.Router();

router.post("/", handleGnerateNewURL);
router.post("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId", handleURLAnalytics);

