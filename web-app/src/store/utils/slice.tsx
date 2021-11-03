import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UtilsState {
  isBackdrop: boolean;
}

const initialState: UtilsState = {
  isBackdrop: false,
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
  },
});

export const utilsActions = utilsSlice.actions;

export default utilsSlice;
