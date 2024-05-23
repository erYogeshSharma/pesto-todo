import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  picture?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    picture: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ email: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
