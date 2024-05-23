import exp from "constants";
import Todo, { TodoModel } from "../models/todo";
import { Types } from "mongoose";

async function createTodo(todo: Todo): Promise<Todo> {
  try {
    console.log(todo);
    const newTodo = new TodoModel(todo);
    return newTodo.save();
  } catch (error) {
    throw new Error(error as string);
  }
}

async function updateTodoById(id: string, todo: Todo): Promise<Todo | null> {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, {
      new: true,
    }).exec();
    return updatedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function deleteTodoById(id: string): Promise<Todo | null> {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id).exec();
    return deletedTodo;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getUserTodos(
  userId: Types.ObjectId,
  status?: string
): Promise<Todo[]> {
  try {
    const query: { user: Types.ObjectId; status?: string } = { user: userId };
    if (status && status !== "") {
      query.status = status;
    }

    const todos = await TodoModel.find(query).sort({ createdAt: -1 }).exec();
    return todos;
  } catch (error) {
    throw new Error(error as string);
  }
}
export default { createTodo, updateTodoById, deleteTodoById, getUserTodos };
