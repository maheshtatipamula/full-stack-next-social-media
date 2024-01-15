"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LogoutUser,
  deleteBio,
  deleteProfile,
  deleteUser,
  fetchCloseFriends,
  fetchSavedPosts,
  getAllUsers,
  getLoggedInUser,
  getUsers,
  getUsersFollowing,
  ownPublicUserPosts,
  ownUsersPosts,
  removeFollowers,
  updateBio,
  updateCloseFriends,
  updateFollowers,
  updatePrivacy,
  updateProfile,
  updateSavedPosts,
  updateUserName,
} from "./userAPI";
import toast from "react-hot-toast";
import { resetState } from "../post/postSlice";

const initialState = {
  userObj: null,
  status: "idle",
  userPosts: null,
  publicPosts: null,
  savedPosts: null,
  userNameError: null,
  userBioError: null,
  searchResults: null,
  searchResultsError: null,
  searchUserResults: null,
  searchUserResultsError: null,
  userFollowing: null,
  userFollowers: null,
  closeFriends: null,
};

export const getLoggedInUserAsync = createAsyncThunk(
  "user/getLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoggedInUser();

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

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's followers";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const removeFollowersAsync = createAsyncThunk(
  "user/removeFollowers",
  async (friendId, { rejectWithValue }) => {
    try {
      const response = await removeFollowers(friendId);

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

      toast.success(response.data.message);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's close friends";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCloseFriendsAsync = createAsyncThunk(
  "user/fetchCloseFriends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCloseFriends();
      console.log("closefridnged", response.data);
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

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's saved posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const ownUsersPostsAsync = createAsyncThunk(
  "user/ownUsersPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ownUsersPosts();

      return response.data.users.posts;
    } catch (error) {
      const errorMessage = error || "Failed to update user's  posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const ownPublicUserPostsAsync = createAsyncThunk(
  "user/ownPublicUserPosts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ownPublicUserPosts(id);

      return response.data.user.posts;
    } catch (error) {
      const errorMessage = error || "Failed to update user's  posts";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const getUsersFollowingAsync = createAsyncThunk(
  "user/getUsersFollowing",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUsersFollowing(id);

      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to update user's  posts";
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

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteUser();
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
    resetUserState: (state) => {
      state.userObj = null;
      state.closeFriends = null;
      state.userPosts = null;
      state.publicPosts = null;
      state.savedPosts = null;
      state.userNameError = null;
      state.userBioError = null;
      state.searchResults = null;
      state.searchResultsError = null;
      state.searchUserResults = null;
      state.searchUserResultsError = null;
      state.userFollowing = null;
      state.userFollowers = null;
    },
    resetUsersProfile: (state) => {
      state.searchResults = null;
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
      .addCase(removeFollowersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFollowersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.userObj = action.payload;
      })
      .addCase(removeFollowersAsync.rejected, (state, action) => {
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
      .addCase(fetchCloseFriendsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCloseFriendsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload.closeFriends);
        state.closeFriends = action.payload.closeFriends;
      })
      .addCase(fetchCloseFriendsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.closeFriends = null;
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
        state.searchResults = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.searchResults = null;
        state.searchResultsError = action.payload;
      })
      .addCase(getUsersFollowingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersFollowingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userFollowers = action.payload.followers;
        state.userFollowing = action.payload.following;
      })
      .addCase(getUsersFollowingAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userFollowers = null;
        state.userFollowing = null;
      })
      .addCase(ownUsersPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ownUsersPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userPosts = action.payload;
      })
      .addCase(ownUsersPostsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userPosts = null;
      })
      .addCase(ownPublicUserPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ownPublicUserPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.publicPosts = action.payload;
      })
      .addCase(ownPublicUserPostsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.publicPosts = null;
      })
      .addCase(LogoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userObj = null;
        state.closeFriends = null;
        state.userPosts = null;
        state.publicPosts = null;
        state.savedPosts = null;
        state.userNameError = null;
        state.userBioError = null;
        state.searchResults = null;
        state.searchResultsError = null;
        state.searchUserResults = null;
        state.searchUserResultsError = null;
        state.userFollowing = null;
        state.userFollowers = null;
        resetState(state);
      })
      .addCase(LogoutUserAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userObj = null;
        state.closeFriends = null;
        state.userPosts = null;
        state.publicPosts = null;
        state.savedPosts = null;
        state.userNameError = null;
        state.userBioError = null;
        state.searchResults = null;
        state.searchResultsError = null;
        state.searchUserResults = null;
        state.searchUserResultsError = null;
        state.userFollowing = null;
        state.userFollowers = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { addUser, resetUserState, resetUsersProfile } = userSlice.actions;

export const selectUserObj = (state) => state.user.userObj;
export const selectCloseFiends = (state) => state.user.closeFriends;
export const selectSearchUserObj = (state) => state.user.searchUserResults;
export const selectSearchUserObjError = (state) =>
  state.user.searchUserResultsError;
export const selectSavedPosts = (state) => state.user.savedPosts;
export const selectUserPosts = (state) => state.user.userPosts;
export const selectUserFollowers = (state) => state.user.userFollowers;
export const selectUserFollowing = (state) => state.user.userFollowing;
export const selectPublicPosts = (state) => state.user.publicPosts;
export const selectUserNameError = (state) => state.user.userNameError;
export const selectSearchResults = (state) => state.user.searchResults;
export const selectSearchResultsError = (state) =>
  state.user.searchResultsError;

export default userSlice.reducer;
