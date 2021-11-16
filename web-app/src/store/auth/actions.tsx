import api from "../../api/api";
import { AppDispatch } from "..";
import { authActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const signin = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log(email, password);
      const response = await api.post("/users/signin", { email, password });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.data.user._id);
      dispatch(
        authActions.login({
          token: response.data.token,
          isUserLoggedIn: true,
        })
      );
    } catch (err) {
      console.error("SIGNIN ERROR: ", err);
      dispatch(utilsActions.setAppError({ msg: "Sign in error" }));
    }
  };
};

export const checkEmail =
  (email: string, password: string, passwordConfirm: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("users/signup/checkEmail", { email });
      const { status, message } = response.data;
      if (status !== "success") {
        dispatch(utilsActions.setAppError({ msg: message }));
      }
      dispatch(
        authActions.checkEmail({
          status: status as "fail" | "success" | null,
          message: message,
          email,
          password,
          passwordConfirm,
        })
      );
    } catch (err) {
      console.error("Check email", err);
      dispatch(utilsActions.setAppError({ msg: "Email is already in use" }));
    }
  };

export const setStatus =
  (status: "success" | "fail" | null) => (dispatch: AppDispatch) => {
    dispatch(authActions.setStatus({ status }));
  };

export const signup = (
  name: string,
  surname: string,
  email: string,
  password: string,
  passwordConfirm: string,
  username: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/users/signup", {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        username,
      });
      if (response.data.status === "success")
        dispatch(
          authActions.signup({
            isSingupSuccess: true,
          })
        );
    } catch (err) {
      console.error("SIGNUP ERROR", err);
      dispatch(utilsActions.setAppError({ msg: "Sign up error" }));
    }
  };
};
