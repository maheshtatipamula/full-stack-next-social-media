"use client";
import { selectUserObj } from "@/features/user/userSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";

const ProfileButton = () => {
  const user = useSelector(selectUserObj);
  return (
    <>
      {user && user.profileImage ? (
        <Image
          src={`/${user?.profileImage}`}
          height={25}
          width={25}
          className=" rounded-full"
          alt="profile"
        />
      ) : (
        <RxAvatar style={{ height: "25px", width: "25px" }} />
      )}
    </>
  );
};

export default ProfileButton;
