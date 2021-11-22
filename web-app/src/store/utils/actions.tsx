import { AppDispatch } from "..";
import { utilsActions } from "./slice";

export const updateBackdrop =
  (isBackdrop: boolean) => async (dispatch: AppDispatch) => {
    dispatch(utilsActions.updateBackdrop({ isBackdrop }));
  };

export const setAppError = (msg: string) => async (dispatch: AppDispatch) => {
  dispatch(utilsActions.setAppError({ msg }));
};

export const setStatus =
  (status: "success" | "fail" | null) => (dispatch: AppDispatch) => {
    dispatch(utilsActions.setRequestStatus({ status }));
  };
