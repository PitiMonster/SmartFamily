import { configureStore } from "@reduxjs/toolkit";

import utilsSlice from "./utils/slice";
import authSlice from "./auth/slice";

const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
