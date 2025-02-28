import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import { baseApi } from "./api/baseApi";
import { uploadApi } from "./api/fileUpload";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, uploadApi.middleware),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
