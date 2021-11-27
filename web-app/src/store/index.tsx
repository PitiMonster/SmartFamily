import { configureStore } from "@reduxjs/toolkit";

import utilsSlice from "./utils/slice";
import authSlice from "./auth/slice";
import groupsSlice from "./groups/slice";
import chatSlice from "./chat/slice";
import calendarSlice from "./calendar/slice";
import budgetSlice from "./budget/slice";
import shoppingListSlice from "./shopping/slice";
import childrenSlice from "./children/slice";
import userSlice from "./user/slice";
import invitationsSlice from "./invitations/slice";
import notificationsSlice from "./notifications/slice";
import tasksSlice from "./tasks/slice";

const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    auth: authSlice.reducer,
    groups: groupsSlice.reducer,
    chats: chatSlice.reducer,
    calendar: calendarSlice.reducer,
    budget: budgetSlice.reducer,
    shopping: shoppingListSlice.reducer,
    children: childrenSlice.reducer,
    user: userSlice.reducer,
    invitations: invitationsSlice.reducer,
    notifications: notificationsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
