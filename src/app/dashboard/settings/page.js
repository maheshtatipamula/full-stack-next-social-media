"use client";
import { explorePostsAsync, resetState } from "@/features/post/postSlice";
import { updatePrivacy } from "@/features/user/userAPI";
import {
  deleteUserAsync,
  fetchCloseFriendsAsync,
  getUsersAsync,
  selectCloseFiends,
  selectUserObj,
  updateCloseFriendsAsync,
  updatePrivacyAsync,
} from "@/features/user/userSlice";
import moment from "moment";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUserObj);
  const closeFriends = useSelector(selectCloseFiends);
  const [clicked, setClick] = useState(false);

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };

  const handleCloseFriends = async (friendId) => {
    await dispatch(updateCloseFriendsAsync(friendId));
    dispatch(fetchCloseFriendsAsync());
  };

  const handleChange = async () => {
    await dispatch(updatePrivacyAsync());

    dispatch(explorePostsAsync());
  };

  const handleDelete = async () => {
    const res = await dispatch(deleteUserAsync());
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(resetState());
      router.replace("/login", { shallow: true });
    }
  };

  useEffect(() => {
    dispatch(fetchCloseFriendsAsync());
  }, []);

  return (
    <>
      {user && (
        <div
          className={`text-white p-2 mx-auto w-[80%] relative  mb-9 ${
            clicked ? " background-blur" : null
          }`}
        >
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
            {user.closeFriends.length < 0 ? (
              <p className="text-white">no one is in close friends list</p>
            ) : (
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700 w-[80%]"
              >
                {closeFriends &&
                  closeFriends.map((friend) => (
                    <li className="py-3 sm:py-4 " key={friend._id}>
                      <div className="flex items-center">
                        <div
                          className="flex-shrink-0 cursor-pointer"
                          onClick={() => handleClick(friend.username)}
                        >
                          <Image
                            src={`/${friend.profileImage}`}
                            alt="post author profile"
                            width={68}
                            height={68}
                            className="w-[48px] h-[48px] md:w-[68px] md:h-[68px] border-2 border-white rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p
                            className="text-sm font-medium text-gray-900 truncate dark:text-white cursor-pointer"
                            onClick={() => handleClick(friend.username)}
                          >
                            {friend.username}
                          </p>

                          <p
                            className="text-sm text-gray-500 truncate dark:text-gray-400 cursor-pointer"
                            onClick={() => handleClick(friend.username)}
                          >
                            {friend.email}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {user._id === friend._id ? (
                            <Link
                              href="/dashboard/edit-profile"
                              className="bg-slate-500 mr-5 w-[50px] h-[30px] text-center rounded-sm hover:bg-slate-600"
                            >
                              {" "}
                              edit
                            </Link>
                          ) : (
                            <p onClick={() => handleCloseFriends(friend._id)}>
                              {user.closeFriends.includes(friend._id)
                                ? " remove "
                                : "add"}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="my-2">
            <h2 className="text-2xl mb-5"> Update Password</h2>
            <Link href="/dashboard/update-password">
              click here to update password
            </Link>
            {user.lastTimeUpdatedPassword && (
              <p>
                you updated your password last time is{" "}
                {moment(user.lastTimeUpdatedPassword).fromNow()}
              </p>
            )}
          </div>
          <div className="my-2">
            <h2 className="text-2xl mb-5"> delete Your Account</h2>
            <button onClick={() => setClick(true)}>click here to delete</button>
          </div>
          {clicked && (
            <div className="absolute top-[25%] z-10 bg-slate-600 left-auto shadow-2xl h-[80%] w-[80%] flex flex-col justify-center items-center">
              <h1 className="mb-10 text-2xl">Delete Your Account</h1>
              <p className="mb-10">
                {" "}
                Are you sure you want to delete your account?
              </p>
              <div className="flex justify-between gap-5">
                <button
                  className="bg-green-700 mr-5 w-[100px] rounded-md h-[30px] text-center  text-xl hover:bg-green-600  px-2"
                  onClick={() => setClick(false)}
                >
                  no
                </button>
                <button
                  className="bg-red-700 mr-5 w-[100px] rounded-md h-[30px] text-center  text-xl hover:bg-red-600  px-2"
                  onClick={handleDelete}
                >
                  yes
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Settings;
