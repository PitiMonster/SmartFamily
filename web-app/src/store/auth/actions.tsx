import api from "../../api/api";
import { AppDispatch } from "..";
import { authActions } from "./slice";
import { utilsActions } from "../utils/slice";
import { groupsActions } from "../groups/slice";

export const signin = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log(email, password);
      const response = await api.post("/users/signin", { email, password });
      console.log(response);
      localStorage.clear();

      const { _id, role, families } = response.data.data.user;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", _id);
      localStorage.setItem("role", role);
      dispatch(groupsActions.setFamilies({ families }));
      dispatch(
        authActions.login({
          token: response.data.token,
          isUserLoggedIn: true,
        })
      );
    } catch (err: any) {
      console.error("SIGNIN ERROR: ", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
};

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
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
      })
    );
  } catch (err: any) {
    console.error("Check email", err);
    dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
  }
};

export const checkUsername =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("users/signup/checkUsername", {
        username,
      });
      const { status, message } = response.data;
      if (status !== "success") {
        dispatch(utilsActions.setAppError({ msg: message }));
      }
      dispatch(
        authActions.checkUsername({
          status: status as "fail" | "success" | null,
          message: message,
        })
      );
    } catch (err: any) {
      console.error("Check username", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };

export const setStatus =
  (status: "success" | "fail" | null) => (dispatch: AppDispatch) => {
    dispatch(authActions.setStatus({ status }));
  };

export const sendParentCode =
  (email: string, childFullName: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("users/signup/childCode", {
        email,
        childFullName,
      });
      const { status, message } = response.data;
      dispatch(authActions.sendParentCode({ status, message }));
    } catch (err: any) {
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };

export const verifyParentCode =
  (
    childCode: string,
    parentEmail: string,
    childId: string = "6169510415ce3402f07ed1ff"
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("users/signup/verifyChildCode", {
        childCode,
        childId,
        parentEmail,
      });
      const { status, message } = response.data;
      dispatch(authActions.verifyParentCode({ status, message }));
    } catch (err: any) {
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };

export const signup = (
  name: string,
  surname: string,
  username: string,
  email: string,
  role: "parent" | "child",
  birthDate: string,
  sex: "male" | "female",
  profilePhoto: string,
  password: string,
  passwordConfirm: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/users/signup", {
        name,
        surname,
        username,
        email,
        role,
        birthDate,
        sex,
        profilePhoto,
        password,
        passwordConfirm,
      });
      console.log(response);
      const { status, message } = response.data;
      if (role === "child") {
        localStorage.setItem("childId", response.data.data.id);
      }
      dispatch(
        authActions.signup({
          status,
          message,
        })
      );
    } catch (err: any) {
      console.error("SIGNUP ERROR", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
};

export const forgotPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("users/forgotPassword", {
        email,
      });
      const { status, message } = response.data;
      dispatch(authActions.forgotPassword({ status, message }));
    } catch (err: any) {
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
export const resetPassword =
  (password: string, passwordConfirm: string, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(`users/resetPassword/${id}`, {
        password,
        passwordConfirm,
      });
      const { status, message } = response.data;
      dispatch(authActions.resetPassword({ status, message }));
    } catch (err: any) {
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
