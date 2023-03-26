import { configureStore } from "@reduxjs/toolkit";
import FilmSlice from "./FilmSlice";
import CommentSlice from "./CommentSlice";
const store = configureStore({
  reducer: {
    film: FilmSlice,
    commemt: CommentSlice,
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
