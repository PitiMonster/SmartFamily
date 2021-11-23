import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationsState {}

const initialState: NotificationsState = {};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice;
