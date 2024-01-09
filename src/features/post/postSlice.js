"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  commentPost,
  deleteCommentOnPost,
  deletePost,
  editPost,
  explorePosts,
  followersPosts,
  likeCommentOnPost,
  likePost,
  uploadPost,
} from "./postAPI";
import toast from "react-hot-toast";

const initialState = {
  followersPosts: [],
  followersPostsError: null,
  explorePosts: [],
  explorePostsError: null,
  status: "idle",
};

export const uploadPostAsync = createAsyncThunk(
  "post/uploadPost",
  async ({ Image, caption }, { rejectWithValue }) => {
    try {
      const response = await uploadPost({ Image, caption });
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.post;
    } catch (error) {
      const errorMessage = error || "Failed to upload post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const editPostAsync = createAsyncThunk(
  "post/editPost",
  async ({ postId, caption }, { rejectWithValue }) => {
    try {
      const response = await editPost({ postId, caption });
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.post;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deletePost(postId);
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.post;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const followersPostsAsync = createAsyncThunk(
  "post/followersPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await followersPosts();
      console.log(response.data);

      return response.data.followersPosts;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const explorePostsAsync = createAsyncThunk(
  "post/explorePosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await explorePosts();
      console.log(response.data);

      return response.data.publicPosts;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const likePostAsync = createAsyncThunk(
  "post/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await likePost(postId);
      console.log(response.data);

      return response.data.post;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const commentPostAsync = createAsyncThunk(
  "post/commentPost",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const response = await commentPost({ postId, comment });
      console.log(response.data);

      return response.data.publicPosts;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCommentOnPostAsync = createAsyncThunk(
  "post/deleteCommentOnPost",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await deleteCommentOnPost({ commentId });
      console.log(response.data);

      return response.data.publicPosts;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const likeCommentOnPostAsync = createAsyncThunk(
  "post/likeCommentOnPost",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await likeCommentOnPost({ commentId });
      console.log(response.data);

      return response.data.publicPosts;
    } catch (error) {
      const errorMessage = error || "Failed to update post";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(uploadPostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(editPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(editPostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(followersPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followersPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.followersPosts = action.payload;
        state.followersPostsError = null;
      })
      .addCase(followersPostsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.followersPosts = null;
        state.followersPostsError = action.payload;
      })
      .addCase(explorePostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(explorePostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.explorePosts = action.payload;
        state.explorePostsError = null;
      })
      .addCase(explorePostsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.explorePosts = null;
        state.explorePostsError = action.payload;
      })
      .addCase(likePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(likePostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(commentPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(commentPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(commentPostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteCommentOnPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCommentOnPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteCommentOnPostAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(likeCommentOnPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeCommentOnPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(likeCommentOnPostAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectUserFollowersPosts = (state) => state.post.followersPosts;
export const selectExplorePosts = (state) => state.post.explorePosts;

export default postSlice.reducer;