import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import friendReducer from "./slices/friendSlice";
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    friend: friendReducer,
    request: requestReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
