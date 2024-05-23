import jwt from "jsonwebtoken";
import User from "../database/models/user";
import userRepo from "../database/repositories/userRepo";
import validator, { ValidationSource } from "../helpers/validator";
import schema from "./schema";
import asyncHandler from "../helpers/asyncHandler";

import { BadRequestError } from "../core/ApiError";
import { ProtectedRequest } from "app-request";
import { config } from "../config";

import express from "express";
const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        throw new BadRequestError("Authorization is required");
      }
      const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret) as { _id: string } & User;
      console.log(decoded);
      const user = await userRepo.findByEmail(decoded.email);
      if (!user) {
        throw new BadRequestError("User not found");
      }
      req.user = user;
      next();
    } catch (err) {
      throw new BadRequestError("Invalid Token");
    }
  })
);
