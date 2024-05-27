"use client";

import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
