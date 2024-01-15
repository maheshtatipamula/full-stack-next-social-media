"use client";
import {
  explorePostsAsync,
  followersPostsAsync,
} from "@/features/post/postSlice";
import {
  getLoggedInUserAsync,
  getUsersAsync,
  selectSearchResults,
  selectSearchResultsError,
  selectUserObj,
  updateFollowersAsync,
} from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  const [searchUserName, setSearchUserName] = useState();
  const searchUser = useSelector(selectSearchResults);
  const user = useSelector(selectUserObj);

  const searchUserError = useSelector(selectSearchResultsError);
  const dispatch = useDispatch();

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    dispatch(followersPostsAsync());
    dispatch(explorePostsAsync());
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUsersAsync(searchUserName));
  };

  return (
    <div className="mx-auto w-[80%]">
      <form onSubmit={handleBioSubmit}>
        <div className="relative w-full md:w-[80%]">
          {" "}
          <input
            type="textarea"
            placeholder="search username"
            onChange={(e) => setSearchUserName(e.target.value)}
            value={searchUserName}
            className=" border-b w-[100%] border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
          />
          <button type="submit" className="absolute top-1 right-1">
            <FaMagnifyingGlass />
          </button>
        </div>
      </form>
      {searchUser && (
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700 w-full md:w-[82%]"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center gap-0">
              <div className="flex-shrink-0">
                <Link href={"/dashboard/users-profile"}>
                  <Image
                    src={`/${searchUser.profileImage}`}
                    alt="post author profile"
                    width={68}
                    height={68}
                    className="w-[48px] h-[48px] md:w-[68px] md:h-[68px] border-2 border-white rounded-full"
                  />
                </Link>{" "}
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <Link href={"/dashboard/users-profile"}>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {searchUser.username}
                  </p>
                </Link>
                <Link href={"/dashboard/users-profile"}>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {searchUser.email}
                  </p>
                </Link>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {user._id === searchUser._id ? (
                  <Link
                    href="/dashboard/edit-profile"
                    className="bg-slate-500 mr-5 w-[50px] h-[30px] text-center rounded-sm hover:bg-slate-600"
                  >
                    {" "}
                    edit
                  </Link>
                ) : (
                  <button
                    className="bg-slate-500 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                    onClick={() => handleFollowers(searchUser._id)}
                  >
                    {user.following.includes(searchUser._id)
                      ? "UnFollow"
                      : user.pendingRequest.includes(searchUser._id.toString())
                      ? "Requested"
                      : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </li>
        </ul>
      )}

      {searchUserError && <p>{searchUserError}</p>}
    </div>
  );
};

export default Search;
