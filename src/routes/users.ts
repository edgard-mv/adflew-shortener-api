import { Router } from "express";
import { check } from "express-validator";
import { registerUser } from "controllers/user.controller";

const router = Router();

// @route   POST api/user
// @desc    Register user given their username and password, returns the token upon successful registration
// @access  Public
router.post("/", [
  check("username", "Please include a username").exists(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  registerUser,
]);

export default router;
