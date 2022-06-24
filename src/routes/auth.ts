import { Router } from "express";
import { check } from "express-validator";
import auth from "middleware/auth.middleware";

import { getAuthenticatedUser, logUserIn } from "controllers/auth.controller";

const authRouter = Router();

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
authRouter.get("/", auth, getAuthenticatedUser);

// @route   POST api/auth
// @desc    Log user in  and return token
// @access  Public
authRouter.post(
  "/",
  [
    check("username", "Please include a username").exists(),
    check("password", "Password is required").exists(),
  ],
  logUserIn
);

export default authRouter;
