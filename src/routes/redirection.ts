import { Router } from "express";

import { param } from "express-validator";

// handlers
import { redirectShortCode } from "controllers/link.controller";

const redirectionRouter = Router();

// @route   GET /:shortCode
// @desc    redirect to original destination given corresponding shortCode
// @access  Public
redirectionRouter.get(
  "/:shortCode",
  param("shortCode", "Invalid short code").isLength({ min: 7 }),
  redirectShortCode
);

export default redirectionRouter;
