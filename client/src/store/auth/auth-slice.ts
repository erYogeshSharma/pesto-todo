import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/auth.types";
import { signIn, signUp } from "./auth-api";

type AuthState = {
  user: User;
  token: string;

  error: string;
  isAuthenticating: boolean;
};

const initialState: AuthState = {
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
  },
  token: "",

  //
  error: "",
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
      state.isAuthenticating = false;
    },
    signOut: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
  extraReducers: (builder) => {
    //SIGNUP
    builder.addCase(signUp.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.error = action.payload as string;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    });
    //signIn
    builder.addCase(signIn.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.error = action.payload as string;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
    });
  },
});

export const { clearErrors, signOut } = authSlice.actions;

export default authSlice.reducer;
