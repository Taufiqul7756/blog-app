import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest } from "../utils/service";

export const fetchPostsAndUsers = createAsyncThunk(
  "posts/fetchPostsAndUsers",
  async (page, { getState }) => {
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

    combinedData.sort((a, b) => b.id - a.id); // Sorting in descending order by post ID

    const itemsPerPage = 10;
    const totalPages = Math.ceil(combinedData.length / itemsPerPage);
    const currentPage = page || getState().posts.page;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = combinedData.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return { posts: paginatedData, totalPages };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAndUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAndUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPostsAndUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = postsSlice.actions;

export default postsSlice.reducer;
