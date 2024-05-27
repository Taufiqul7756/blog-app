"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest } from "../utils/service";

export const fetchPostsAndUsers = createAsyncThunk(
  "posts/fetchPostsAndUsers",
  async () => {
    const postsResponse = await getRequest(`${baseUrl}/posts`);
    const usersResponse = await getRequest(`${baseUrl}/users`);

    if (postsResponse.error || usersResponse.error) {
      throw new Error(postsResponse.message || usersResponse.message);
    }

    const postsData = postsResponse;
    const usersData = usersResponse;

    const combinedData = postsData.map((post) => {
      const user = usersData.find((user) => user.id === post.userId);
      return { ...post, userName: user ? user.name : "Unknown User" };
    });

    combinedData.sort((a, b) => b.id - a.id);

    return combinedData;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAndUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAndUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsAndUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
