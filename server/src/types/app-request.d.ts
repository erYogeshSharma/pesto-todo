import { Request } from "express";
import User from "../database/models/user";

declare interface PublicRequest extends Request {}

declare interface ProtectedRequest extends PublicRequest {
  user: User;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
}
