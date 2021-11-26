import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import history from "history/browser";

interface AuthState {
  token: string | null;
  isUserLoggedIn: boolean;
  isSingupSuccess: boolean;
  status?: "fail" | "success" | null;
  message?: string;
}

const initialState: AuthState = {
  token: null,
  isUserLoggedIn: !!localStorage.getItem("token"),
  isSingupSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        token: string;
        isUserLoggedIn: boolean;
      }>
    ) {
      const { token, isUserLoggedIn } = action.payload;
      state.token = token;
      state.isUserLoggedIn = isUserLoggedIn;
    },
    checkEmail(
      state,
      action: PayloadAction<{
        status: "fail" | "success" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;

      state.status = status;
      state.message = message;
    },
    checkUsername(
      state,
      action: PayloadAction<{
        status: "fail" | "success" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;

      state.status = status;
      state.message = message;
    },
    setStatus(
      state,
      action: PayloadAction<{ status: "success" | "fail" | null }>
    ) {
      state.status = action.payload.status;
    },
    sendParentCode(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },
    verifyParentCode(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },
    signup(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },
    forgotPassword(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },
    resetPassword(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
        message: string;
      }>
    ) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },

    logout(state, action) {
      state.token = null;
      state.isUserLoggedIn = false;
      state.isSingupSuccess = false;
      state.status = null;
      localStorage.clear();
      window.location.reload();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
