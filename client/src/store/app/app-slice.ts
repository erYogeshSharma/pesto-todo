import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  notificationOpen: boolean;

  openOnboardModal: boolean;
  error: string;
};

const initialState: AuthState = {
  notificationOpen: false,
  openOnboardModal: false,
  //
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },

    toggleNotificationOpen: (state) => {
      state.notificationOpen = !state.notificationOpen;
    },

    toggleOnboardModal: (state, action: PayloadAction<boolean>) => {
      state.openOnboardModal = action.payload;
    },
  },
  extraReducers: () => {
    //SIGNUP
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const { clearErrors, toggleNotificationOpen, toggleOnboardModal } =
  authSlice.actions;

export default authSlice.reducer;
