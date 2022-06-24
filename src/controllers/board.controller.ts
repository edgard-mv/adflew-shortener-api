import HttpStatusCodes from "http-status-codes";

// Types
import { Request, Response } from "express";

import Link from "models/Link";
import { validationResult } from "express-validator";

// Returns top n most visited links
export const getTopNLinks = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { limit = 20 } = req.params;

  const topNResults = await Link.find({})
    .sort({ visits: "desc" })
    .limit(Number(limit))
    .select("url shortCode visits id")
    .populate("user", ["username", "id"]);

  return res.json({ top: topNResults });
};
