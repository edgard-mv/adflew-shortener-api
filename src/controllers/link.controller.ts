import HttpStatusCodes from "http-status-codes";

// Types
import { Request, Response } from "express";

import Link from "models/Link";
import { validationResult } from "express-validator";
import { getNewIdForUrl } from "utils/urls";
import { User } from "models";

// Return corresponding URL, given shortCode
export const getUrlFromShortCode = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const link = await Link.findOne({ shortCode });

  if (!link) {
    return res.status(HttpStatusCodes.NOT_FOUND).send("URL not found");
  }

  await link.populate("user", ["id", "username"]);

  return res.json({ link });
};

// Return new, or retrieved, url-shortCode pair
export const createShortCode = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      errors: [
        {
          msg: "User not found",
        },
      ],
    });
  }

  const { url } = req.body;

  // verify url isn't registered already by this user
  const existingLink = await Link.findOne({ url, user: user.id }).populate(
    "user",
    ["username", "id"]
  );
  if (existingLink) {
    return res.json({ link: existingLink });
  }

  // register new link
  let shortCode = await getNewIdForUrl();
  const link = new Link({ url, user: req.userId, shortCode });
  user.links.push(link.id);

  await Promise.allSettled([user.save(), link.save()]);

  await link.populate("user", ["username", "id"]);

  return res.json({ link });
};

export const redirectShortCode = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { shortCode } = req.params;

  const link = await Link.findOne({ shortCode });

  if (!link) {
    return res.status(HttpStatusCodes.NOT_FOUND).send("URL not found");
  }

  link.visits += 1;
  await link.save();

  return res.redirect(link.url);
};
