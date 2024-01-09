"use client";
import { explorePostsAsync } from "@/features/post/postSlice";
import { updatePrivacy } from "@/features/user/userAPI";
import { selectUserObj, updatePrivacyAsync } from "@/features/user/userSlice";
import { getLocationOrigin } from "next/dist/shared/lib/utils";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserObj);
  const handleChange = async () => {
    console.log("event");
    await dispatch(updatePrivacyAsync());

    dispatch(explorePostsAsync());
  };

  return (
    <>
      {user && (
        <div className="text-white p-2 mx-auto w-[80%]">
          <div>
            <h1 className="text-3xl mb-5"> Account privacy</h1>
            <div className="flex gap-2 items-center mb-5">
              <h2 className="text-2xl">Private account</h2>
              <label className="relative inline-flex items-center cursor-pointer ">
                <input
                  type="checkbox"
                  checked={user.isPrivate}
                  className="sr-only peer"
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <p>
              When your account is public, your profile and posts can be seen by
              anyone, on or off Instagram, even if they don’t have an Instagram
              account. When your account is private, only the followers you
              approve can see what you share, including your photos or videos on
              hashtag and location pages, and your followers and following
              lists.
            </p>
          </div>
          <div className="mt-5">
            <h2 className="text-2xl mb-5"> Close Friends</h2>
            {user.closeFriends ? (
              <p className="text-white">no one is in close friends list</p>
            ) : (
              <p>{user.closeFriends[0]}</p>
            )}
          </div>
          <div className="mt-5">
            <h2 className="text-2xl mb-5"> Blocked List</h2>
            {user.blocked ? (
              <p className="text-white">no one is in blocked list</p>
            ) : (
              <p>{user.closeFriends[0]}</p>
            )}
          </div>
          <div className="my-2">
            <h2 className="text-2xl mb-5"> Update Password</h2>
            <Link href="/dashboard/update-password">
              click here to update password
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
