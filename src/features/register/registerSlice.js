"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  activationToken: null,
  status: "idle",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.activationToken = action.payload;
    },
  },
  // extraReducers:(builder)=>{
  //     builder
  //     .addCase()
  // }
});

export const { addToken } = registerSlice.actions;

export const selectActivationToken = (state) => state.register.activationToken;

export default registerSlice.reducer;
