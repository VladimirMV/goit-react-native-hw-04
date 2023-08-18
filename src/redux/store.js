import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { postsSlice } from "./posts/postsSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
