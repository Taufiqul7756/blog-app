"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest } from "../utils/service";

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId) => {
    const response = await getRequest(`${baseUrl}/comments?postId=${postId}`);
    if (response.error) {
      throw new Error(response.message);
    }
    return { postId, comments: response };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
      state[action.payload.postId] = action.payload.comments;
    });
  },
});

export default commentsSlice.reducer;
