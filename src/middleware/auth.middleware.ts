import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import { validateToken } from "utils/jwt";
import Request from "../types/Request";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get token from header
  const token = req.header("authorization")?.split(" ")?.[1];

  // check if no token
  if (!token) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  } else {
    // validate token
    try {
      const payload = await validateToken(token);
      req.userId = payload.userId;
      next();
    } catch (err) {
      console.error(err);
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ msg: "Token is not valid" });
    }
  }
}
