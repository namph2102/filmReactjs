import { configureStore } from "@reduxjs/toolkit";
import FilmSlice from "./FilmSlice";
import ApiSlice from "./ApiSlice";
const store = configureStore({
  reducer: {
    film: FilmSlice,
    api: ApiSlice,
  },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
