import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createTodo, getAllTodo, updateTodo } from "./to-do-api";
import { TODO } from "../types/to-do-types";

type ToDoState = {
  todos: TODO[];

  openForm: boolean;
  toDoForForm: TODO;

  isFetching: boolean;
  isSaving: boolean;
};

const initialState: ToDoState = {
  todos: [],
  isFetching: false,
  isSaving: false,
  openForm: false,
  toDoForForm: {
    _id: undefined,
    name: "",
    status: "To Do",
    description: "",
    createdAt: undefined,
    updatedAt: undefined,
  },
};

export const authSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    filterTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateToDo: (state, action: PayloadAction<TODO>) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    //TODO FORM
    openToDoForm: (state, action: PayloadAction<TODO>) => {
      state.openForm = true;
      state.toDoForForm = action.payload || initialState.toDoForForm;
    },
    updateToDoForm: (state, action: PayloadAction<TODO>) => {
      state.toDoForForm = { ...state.toDoForForm, ...action.payload };
    },
    closeToDoForm: (state) => {
      state.openForm = false;
    },
  },
  extraReducers: (builder) => {
    //SIGNUP

    builder.addCase(createTodo.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.isSaving = false;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.isSaving = false;
      state.todos.unshift(action.payload);
      state.openForm = false;
      state.toDoForForm = initialState.toDoForForm;
    });

    //toform
    builder.addCase(updateTodo.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isSaving = false;
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      state.openForm = false;
      state.toDoForForm = initialState.toDoForForm;
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.isSaving = false;
    });

    //get all
    builder.addCase(getAllTodo.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllTodo.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(getAllTodo.fulfilled, (state, action) => {
      state.isFetching = false;
      state.todos = action.payload;
    });
  },
});

export const {
  filterTodo,
  updateToDo,
  openToDoForm,
  closeToDoForm,
  updateToDoForm,
} = authSlice.actions;

export default authSlice.reducer;
