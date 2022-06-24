import { Schema, model, Types } from "mongoose";

interface IUser {
  username: string;
  password: string;
  links: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  },
  { timestamps: true }
);

// Ensure virtual fields are serialized and "_id" is returned as "id".
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

export default model<IUser>("User", userSchema);
