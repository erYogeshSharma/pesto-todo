import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import axios from "axios";
import { TODO } from "../types/to-do-types";

export const createTodo = createAsyncThunk<TODO, TODO>(
  "todo/create",
  async (todo, { rejectWithValue }) => {
    try {
      const { data } = await API.create_todo(todo);
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

export const updateTodo = createAsyncThunk<TODO, TODO>(
  "todo/update",
  async (todo, { rejectWithValue }) => {
    try {
      const { data } = await API.update_todo(todo._id as string, {
        name: todo.name,
        description: todo.description,
        status: todo.status,
      });
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

export const getAllTodo = createAsyncThunk<TODO[], string>(
  "todo/getAll",
  async (filter, { rejectWithValue }) => {
    try {
      const { data } = await API.get_todos(filter);
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
