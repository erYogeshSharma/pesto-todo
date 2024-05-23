import express from "express";
import schema from "./schema";
import validator from "../../helpers/validator";
import asyncHandler from "../../helpers/asyncHandler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import validateJWT from "../../middlewares/auth";
import { ProtectedRequest } from "app-request";
import todoRepo from "../../database/repositories/todoRepo";
import { Types } from "mongoose";
import Logger from "../core/Logger";
const router = express.Router();

router.use(validateJWT);

/* -------------------------------------------------------------------------- */
/*                                 CREATE TODO                                */
/* -------------------------------------------------------------------------- */
router.post(
  "/",
  validator(schema.create),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const todo = await todoRepo.createTodo({
      ...req.body,
      user: req.user._id,
    });
    Logger.info(`TODO CREATED == User:${user._id},Todo:todo._id`)
    new SuccessResponse("Todo created successfully", todo).send(res);
  })
);

/* -------------------------------------------------------------------------- */
/*                                 UPDATE TODO                                */
/* -------------------------------------------------------------------------- */
router.patch(
  "/:id",
  validator(schema.update),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const todo = await todoRepo.updateTodoById(req.params.id, req.body);
    Logger.info(`TODO UPDATED == User:${req.user._id},Todo:req.params.id`)
    new SuccessResponse("Todo updated successfully", todo).send(res);
  })
);

/* -------------------------------------------------------------------------- */
/*                                 DELETE TODO                                */
/* -------------------------------------------------------------------------- */
router.delete(
  "/:id",
  asyncHandler(async (req: ProtectedRequest, res) => {
    await todoRepo.deleteTodoById(req.params.id);
    Logger.info(`TODO DELETED == User:${req.user._id},Todo:req.params.id`)
    new SuccessMsgResponse("Todo deleted successfully").send(res);
  })
);
/* -------------------------------------------------------------------------- */
/*                                GET ALL TODO                                */
/* -------------------------------------------------------------------------- */
router.get(
  "/",

  asyncHandler(async (req: ProtectedRequest, res) => {
    const status = req.query?.status as string;

    const todos = await todoRepo.getUserTodos(
      new Types.ObjectId(req.user._id),
      status || ""
    );
    Logger.info(`TODO FETCHED == User:${req.user._id},Query:${status}`)
    new SuccessResponse("User Todos", todos).send(res);
  })
);

export default router;
