import { Request as ExpressRequest } from "express";
import Payload from "./Payload";

declare module "express-serve-static-core" {
  interface Request {
    userId: Payload["userId"];
    exp: Payload["exp"];
  }
}

type Request = ExpressRequest & Payload;

export default Request;
