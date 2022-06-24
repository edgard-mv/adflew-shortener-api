import { Router } from "express";

import { param } from "express-validator";

// handlers
import { getTopNLinks } from "controllers/board.controller";
import authMiddleware from "middleware/auth.middleware";

const boardRouter = Router();

// @route   GET api/links/board/:limit?
// @desc    Retrieve top n (defaults to 20) most visited urls
// @access  Private
boardRouter.get(
  "/:limit?",
  [
    authMiddleware,
    param("limit", "Not a valid limit").optional().isInt({ min: 1 }),
  ],
  getTopNLinks
);

export default boardRouter;
