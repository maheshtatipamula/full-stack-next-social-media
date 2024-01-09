"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUserAsync } from "../../features/user/userSlice";

import {
  explorePostsAsync,
  followersPostsAsync,
} from "@/features/post/postSlice";

const UserObj = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUserAsync());
    dispatch(followersPostsAsync());
    dispatch(explorePostsAsync());
  }, [dispatch]);

  return <></>;
};

export default UserObj;
