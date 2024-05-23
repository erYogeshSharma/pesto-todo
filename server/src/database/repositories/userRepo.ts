import { BadRequestError } from "../../core/ApiError";
import User, { UserModel } from "../models/user";

async function findByEmail(email: string): Promise<User | null> {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw new BadRequestError(error as string);
  }
}

async function create(user: User): Promise<User> {
  try {
    const newUser = new UserModel(user);
    return newUser.save();
  } catch (error) {
    throw new BadRequestError(error as string);
  }
}

export default { findByEmail, create };
