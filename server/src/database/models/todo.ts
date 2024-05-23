import { Schema, model, Types } from "mongoose";
import User from "./user";

export const DOCUMENT_NAME = "Todo";
export const COLLECTION_NAME = "todos";

export default interface Todo {
  _id?: Types.ObjectId;
  user: User;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Todo>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ user: 1 });

export const TodoModel = model<Todo>(DOCUMENT_NAME, schema, COLLECTION_NAME);
