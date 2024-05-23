import express from "express";
import schema from "./schema";
import validator from "../../helpers/validator";
import asyncHandler from "../../helpers/asyncHandler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import validateJWT from "../../middlewares/auth";
import { ProtectedRequest } from "app-request";
import todoRepo from "../../database/repositories/todoRepo";
import { Types } from "mongoose";
const router = express.Router();

router.use(validateJWT);

/* -------------------------------------------------------------------------- */
/*                                 CREATE TODO                                */
/* -------------------------------------------------------------------------- */
router.post(
  "/",
  validator(schema.create),
  asyncHandler(async (req: ProtectedRequest, res) => {
    console.log({ user: req.user });
    const todo = await todoRepo.createTodo({
      ...req.body,
      user: req.user._id,
    });
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
    new SuccessMsgResponse("Todo deleted successfully").send(res);
  })
);
/* -------------------------------------------------------------------------- */
/*                                GET ALL TODO                                */
/* -------------------------------------------------------------------------- */
router.get(
  "/",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const todos = await todoRepo.getUserTodos(new Types.ObjectId(req.user._id));
    new SuccessResponse("User Todos", todos).send(res);
  })
);

export default router;
