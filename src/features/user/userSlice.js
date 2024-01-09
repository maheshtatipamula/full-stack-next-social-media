"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LogoutUser,
  deleteBio,
  deleteProfile,
  fetchSavedPosts,
  getAllUsers,
  getLoggedInUser,
  getUsers,
  updateBio,
  updateCloseFriends,
  updateFollowers,
  updatePrivacy,
  updateProfile,
  updateSavedPosts,
  updateUserName,
} from "./userAPI";
import toast from "react-hot-toast";

const initialState = {
  userObj: null,
  status: "idle",
  savedPosts: null,
  userNameError: null,
  userBioError: null,
  searchResults: null,
  searchResultsError: null,
  searchUserResults: null,
  searchUserResultsError: null,
};

export const getLoggedInUserAsync = createAsyncThunk(
  "user/getLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoggedInUser();
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to fetch user";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const updateBioAsync = createAsyncThunk(
  "user/updateBio",
  async (bio, { rejectWithValue }) => {
    try {
      const response = await updateBio(bio);
      console.log(response.data);
      toast.success("bio updated successfully");

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's bio";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteBioAsync = createAsyncThunk(
  "user/deleteBio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteBio();
      toast.success("bio deleted successfully");
      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to delete  user's bio";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(formData);
      console.log(response.data);
      toast.success("profile updated successfully");

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user profile";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const deleteProfileAsync = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteProfile();
      toast.success("profile deleted successfully");
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to delete user profile";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const updateUserNameAsync = createAsyncThunk(
  "user/updateUserName",
  async (username, { rejectWithValue }) => {
    try {
      const response = await updateUserName(username);
      console.log(response.data);
      toast.success("username updated successfully");

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update username";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const updateFollowersAsync = createAsyncThunk(
  "user/updateFollowers",
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await updateFollowers(friendId);
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's followers";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);
export const updateCloseFriendsAsync = createAsyncThunk(
  "user/updateCloseFriends",
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await updateCloseFriends(friendId);
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's close friends";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const updatePrivacyAsync = createAsyncThunk(
  "user/updatePrivacy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await updatePrivacy();
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user privacy";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const updateSavedPostsAsync = createAsyncThunk(
  "user/updateSavedPosts",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await updateSavedPosts(postId);
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's saved posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async (searchUserName, { rejectWithValue }) => {
    try {
      const response = await getUsers(searchUserName);
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's saved posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      console.log(response.data);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's saved posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSavedPostsAsync = createAsyncThunk(
  "user/fetchSavedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSavedPosts();
      console.log(response.data);

      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to update user's saved posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const LogoutUserAsync = createAsyncThunk(
  "user/LogoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LogoutUser();
      console.log(response);
      toast.success(response.data.message);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to logout  user";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userObj = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userObj = action.payload;
      })
      .addCase(getLoggedInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userObj = null;
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchUserResults = action.payload;
        state.searchUserResultsError = null;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.searchUserResults = null;
        state.searchUserResultsError = action.payload;
      })
      .addCase(updateBioAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBioAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userBioError = null;
        state.userObj = action.payload;
      })
      .addCase(updateBioAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userBioError = action.payload;
      })
      .addCase(deleteBioAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBioAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(deleteBioAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(deleteProfileAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateUserNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserNameAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userObj = action.payload;
        state.userNameError = null;
      })
      .addCase(updateUserNameAsync.rejected, (state, action) => {
        state.status = "idle";

        state.userNameError = action.payload;
      })
      .addCase(updateFollowersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFollowersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(updateFollowersAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCloseFriendsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCloseFriendsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(updateCloseFriendsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateSavedPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSavedPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(updateSavedPostsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updatePrivacyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePrivacyAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(updatePrivacyAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchSavedPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSavedPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload.user;
        state.savedPosts = action.payload.savedPosts;
      })
      .addCase(fetchSavedPostsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchResultsError = null;
        console.log(action.payload);

        state.searchResults = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.searchResults = null;
        state.searchResultsError = action.payload;
      })
      .addCase(LogoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userObj = null;
      })
      .addCase(LogoutUserAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { addUser } = userSlice.actions;

export const selectUserObj = (state) => state.user.userObj;
export const selectSearchUserObj = (state) => state.user.searchUserResults;
export const selectSearchUserObjError = (state) =>
  state.user.searchUserResultsError;
export const selectSavedPosts = (state) => state.user.savedPosts;
export const selectUserNameError = (state) => state.user.userNameError;
export const selectSearchResults = (state) => state.user.searchResults;
export const selectSearchResultsError = (state) =>
  state.user.searchResultsError;

export default userSlice.reducer;
