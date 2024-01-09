"use client";

import { LogoutUserAsync } from "@/features/user/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await dispatch(LogoutUserAsync());
      console.log("res");
      if (res.meta.requestStatus === "fulfilled") {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center gap-3  mb-10 lg:mb-5"
      onClick={handleLogout}
    >
      <LuLogOut style={{ height: "25px", width: "25px" }} />
      <h1 className="text-2xl hidden lg:block"> Logout</h1>
    </div>
  );
};

export default LogoutButton;
