import express from "express";
// import schema from "./schema";
import * as http from "http";
import validator from "../../helpers/validator";
import asyncHandler from "../../helpers/asyncHandler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
const router = express.Router();
import oauth2client from "../../utils/oauth2client";
import { BadRequestError } from "../../core/ApiError";
import axios from "axios";
import userRepo from "../../database/repositories/userRepo";
import schema from "./schema";
import { PublicRequest } from "app-request";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

interface UserInfoResponse {
  // Define the expected structure of the response data here
  // (e.g., id, email, name)
}

/* -------------------------------------------------------------------------- */
/*                                GET AUTH URL                                */
/* -------------------------------------------------------------------------- */
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const code = req.query.code;

//     if (!code) {
//       throw new BadRequestError("Code is required");
//     }
//     const googleRes = await oauth2client.getToken(code as string);
//     oauth2client.setCredentials(googleRes.tokens);

//     const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
//     if (!data) throw new BadRequestError("User Info not found");

//     const userExits = await userRepo.findByEmail(data.email);

//     if (userExits) {
//     }

//     if (!userExits) {
//       const user = {
//         name: data.name,
//         email: data.email,
//         picture: data.picture,
//         googleId: data.id,
//       };
//       const userRes = userRepo.create(user);
//     }

//     new SuccessResponse("Link Created", userRes.data).send(res);
//   })
// );

/* -------------------------------------------------------------------------- */
/*                             CREDENTIALS SIGN-UP                             */
/* -------------------------------------------------------------------------- */
router.post(
  "/register",
  validator(schema.register),
  asyncHandler(async (req: PublicRequest, res) => {
    const { name, email, password } = req.body;

    const userExits = await userRepo.findByEmail(email);
    if (userExits) {
      throw new BadRequestError("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
    });

    // Create a JWT token
    const token = jwt.sign(
      { email: newUser.email, name: newUser.name, picture: newUser.picture },
      config.jwtSecret,
      {
        expiresIn: config.tokenExp,
      }
    );

    new SuccessResponse("Register Success", { user: newUser, token }).send(res);
  })
);

/* -------------------------------------------------------------------------- */
/*                             CREDENTIALS SIGN-IN                             */
/* -------------------------------------------------------------------------- */
router.post(
  "/login",
  validator(schema.login),
  asyncHandler(async (req: PublicRequest, res) => {
    const { email, password } = req.body;

    const userExits = await userRepo.findByEmail(email.toLowerCase());
    if (!userExits) {
      throw new BadRequestError("User not registered");
    }

    const match = await bcrypt.compare(password, userExits.password as string);

    if (!match) {
      throw new BadRequestError("Invalid Password");
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: userExits._id, email: userExits.email },
      config.jwtSecret,
      {
        expiresIn: config.tokenExp,
      }
    );

    new SuccessResponse("Login Successful", {
      user: {
        email: userExits.email,
        name: userExits.name,
        picture: userExits.picture,
      },
      token,
    }).send(res);
  })
);

export default router;
