"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { forgotPasswordApi, updatePasswordApi, verifyOtpApi } from "./authApi";

const initialState = {
  state: "idle",
  updatePasswordErrors: null,
  forgotUserNameErrors: null,
  forgotPasswordErrors: null,
  verifyOtpToken: null,
};

export const updatePasswordApiAsync = createAsyncThunk(
  "auth/updatePasswordApi",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await updatePasswordApi({ oldPassword, newPassword });
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to fetch user";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPasswordApiAsync = createAsyncThunk(
  "auth/forgotPasswordApi",
  async (username, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi(username);
      console.log(response.data);
      toast.success(response.data.message);

      return response.data.verifyOtpToken;
    } catch (error) {
      const errorMessage = error || "Failed to fetch user";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOtpApiAsync = createAsyncThunk(
  "auth/verifyOtpApi",
  async (
    { verifyOtpToken, forgotPasswordOtp, newPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await verifyOtpApi({
        verifyOtpToken,
        forgotPasswordOtp,
        newPassword,
      });
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      const errorMessage = error || "Failed to fetch user";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUpdatePasswordErrors: (state) => {
      state.updatePasswordErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordApiAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePasswordApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updatePasswordErrors = null;
      })
      .addCase(updatePasswordApiAsync.rejected, (state, action) => {
        state.status = "idle";
        state.updatePasswordErrors = action.payload;
      })
      .addCase(forgotPasswordApiAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPasswordApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.forgotUserNameErrors = null;
        state.verifyOtpToken = action.payload;
      })
      .addCase(forgotPasswordApiAsync.rejected, (state, action) => {
        state.status = "idle";
        state.verifyOtpToken = null;
        state.forgotUserNameErrors = action.payload;
      })
      .addCase(verifyOtpApiAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtpApiAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.forgotPasswordErrors = null;
      })
      .addCase(verifyOtpApiAsync.rejected, (state, action) => {
        state.status = "idle";
        state.forgotPasswordErrors = action.payload;
      });
  },
});

export const { clearUpdatePasswordErrors } = authSlice.actions;

export const selectUpdatePasswordErrors = (state) =>
  state.auth.updatePasswordErrors;
export const selectForgotUserNameErrors = (state) =>
  state.auth.forgotUserNameErrors;
export const selectForgotPasswordErrors = (state) =>
  state.auth.forgotPasswordErrors;
export const selectVerifyOtpToken = (state) => state.auth.verifyOtpToken;

export default authSlice.reducer;
