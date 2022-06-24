import { Response } from "express";
import Request from "types/Request";

import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";
import argon2 from "argon2";

import { User } from "models";
import { generateToken } from "utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    // make sure the username hasn't been taken
    let user = await User.findOne({ username });
    if (user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    const hashedPass = await argon2.hash(password);

    user = new User({
      username,
      password: hashedPass,
    });

    await user.save();

    const token = generateToken({
      userId: user.id,
    });

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send("Server Error");
  }
};
