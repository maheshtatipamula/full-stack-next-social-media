"use client";

import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../features/register/registerSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
    post: postReducer,
    auth: authReducer,
  },
});
export default store;
