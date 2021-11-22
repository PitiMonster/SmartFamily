import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UtilsState {
  isBackdrop: boolean;
  error: string;
  status: "success" | "fail" | null;
}

const initialState: UtilsState = {
  isBackdrop: false,
  error: "",
  status: null,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    updateBackdrop(
      state,
      action: PayloadAction<{
        isBackdrop: boolean;
      }>
    ) {
      const { isBackdrop } = action.payload;
      state.isBackdrop = isBackdrop;
    },
    setAppError(state, action: PayloadAction<{ msg: string }>) {
      const { msg } = action.payload;
      state.error = msg;
    },
    setRequestStatus(
      state,
      action: PayloadAction<{
        status: "success" | "fail" | null;
      }>
    ) {
      const { status } = action.payload;

      state.status = status;
    },
  },
});

export const utilsActions = utilsSlice.actions;

export default utilsSlice;
