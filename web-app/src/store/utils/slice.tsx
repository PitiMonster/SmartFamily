import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UtilsState {
  isBackdrop: boolean;
  error: string;
}

const initialState: UtilsState = {
  isBackdrop: false,
  error: "",
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
  },
});

export const utilsActions = utilsSlice.actions;

export default utilsSlice;
