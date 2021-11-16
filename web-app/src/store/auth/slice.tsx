import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isUserLoggedIn: boolean;
  isSingupSuccess: boolean;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
  surname?: string;
  username?: string;
  birthDate?: Date;
  sex?: "Male" | "Female";
  photo?: string;
  role?: "parent" | "child";
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
        email: string;
        password: string;
        passwordConfirm: string;
      }>
    ) {
      const { status, message, email, password, passwordConfirm } =
        action.payload;

      state.status = status;
      state.message = message;

      if (status === "success") {
        state.email = email;
        state.password = password;
        state.passwordConfirm = passwordConfirm;
      }
    },
    setStatus(
      state,
      action: PayloadAction<{ status: "success" | "fail" | null }>
    ) {
      state.status = action.payload.status;
    },
    signup(
      state,
      action: PayloadAction<{
        isSingupSuccess: boolean;
      }>
    ) {
      const { isSingupSuccess } = action.payload;
      state.isSingupSuccess = isSingupSuccess;
    },
    logout(state, action) {
      state.token = null;
      state.isUserLoggedIn = false;
      state.isSingupSuccess = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
