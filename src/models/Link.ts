import { Schema, model, Types } from "mongoose";
import userSchema from "./User";

interface ILink {
  user: Types.ObjectId;
  url: string;
  shortCode: string;
  visits: number;
}

const linkSchema = new Schema<ILink>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: userSchema.modelName,
      required: true,
    },
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

// Ensure virtual fields are serialized and "_id" is returned as "id".
linkSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

linkSchema.index({ createdAt: 1 }, { expires: "7d" });

export default model<ILink>("Link", linkSchema);
