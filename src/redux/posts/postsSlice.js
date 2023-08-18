import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  ownPosts: [],
  comments: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    updateOwnPosts: (state, { payload }) => ({
      ...state,
      ownPosts: payload,
    }),
    updateCommentsToPost: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    reset: () => ({ ...initialState }),
  },
});

export const postsAction = postsSlice.actions;
