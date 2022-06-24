import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";

// Types
import Request from "types/Request";
import { Response } from "express";

import { User } from "models";
import { verify } from "argon2";
import { generateToken } from "utils/jwt";

// Return information associated to a given token
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const userDoc = await User.findById(req.userId).select(["-password"]);
    res.json(userDoc);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

// Return jwt, given username and password
export const logUserIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    const isValid = await verify(password, user.password);

    if (!isValid) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

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
