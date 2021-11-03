import { AppDispatch } from "..";
import { utilsActions } from "./slice";

export const updateBackdrop =
  (isBackdrop: boolean) => async (dispatch: AppDispatch) => {
    dispatch(utilsActions.updateBackdrop({ isBackdrop }));
  };
