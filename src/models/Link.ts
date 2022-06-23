import { Schema, model } from "mongoose";

interface ILink {
  url: string;
  shortCode: string;
  visits: number;
}

const linkSchema = new Schema<ILink>(
  {
    url: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    visits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

linkSchema.index({ createdAt: 1 }, { expires: "7d" });

export default model<ILink>("Link", linkSchema);
