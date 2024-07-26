import { nanoid } from "nanoid";
import { URL } from "../models/url.schema.js";

export const handleGnerateNewURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedhistory: [],
  });
  return res.json({ id: shortId });
};
export const handleURLAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Short Id", shortId);
  if (!shortId) return res.status(400).json({ error: "URL is required" });
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
};
export const handleRedirectURL = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Short Id", shortId);
  if (!shortId) return res.status(400).json({ error: "URL is required" });
  const result = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(" result", result);
  res.redirect(result.redirectURL);
};
