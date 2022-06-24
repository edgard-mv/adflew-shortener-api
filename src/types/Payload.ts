import { Types } from "mongoose";

type payload = {
  userId: Types.ObjectId;
  exp: number;
};

export default payload;
