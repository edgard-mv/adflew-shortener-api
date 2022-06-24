import { Router } from "express";

import { body, param } from "express-validator";

// handlers
import {
  createShortCode,
  getUrlFromShortCode,
} from "controllers/link.controller";
import { isValidHttpUrlWithTld } from "utils/urls";
import authMiddleware from "middleware/auth.middleware";

const linksRouter = Router();

// @route   GET api/links/:shortCode
// @desc    Retrieve url info given corresponding shortCode
// @access  Public
linksRouter.get(
  "/:shortCode",
  param("shortCode", "Invalid short code").isLength({ min: 7 }),
  getUrlFromShortCode
);

// @route   POST api/links
// @desc    Register url-shortCode pair given url
// @access  Private
linksRouter.post(
  "/",
  [
    authMiddleware,
    body("url").custom((value) => {
      const result = isValidHttpUrlWithTld(value);
      if (!result.isValid) {
        throw new Error(result.reason);
      }
      return result.isValid;
    }),
  ],
  createShortCode
);

export default linksRouter;
