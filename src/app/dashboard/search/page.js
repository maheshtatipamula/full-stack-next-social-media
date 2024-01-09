"use client";
import { explorePostsAsync } from "@/features/post/postSlice";
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

const Search = () => {
  const [searchUserName, setSearchUserName] = useState();
  const searchUser = useSelector(selectSearchResults);
  const user = useSelector(selectUserObj);
  console.log(searchUser);
  const searchUserError = useSelector(selectSearchResultsError);
  const dispatch = useDispatch();

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));

    dispatch(explorePostsAsync());
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUsersAsync(searchUserName));
  };

  return (
    <div className="mx-auto w-[80%]">
      <form onSubmit={handleBioSubmit}>
        <input
          type="textarea"
          placeholder="search username"
          onChange={(e) => setSearchUserName(e.target.value)}
          value={searchUserName}
          className="border-b w-[50%] border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
        />

        <input type="submit" />
      </form>
      {searchUser && (
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700 w-[80%]"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href={"/dashboard/users-profile"}>
                  <Image
                    src={`/${searchUser.profileImage}`}
                    alt="post author profile"
                    width={68}
                    height={68}
                    className=" border-2 border-white rounded-full"
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
                      : " Follow"}
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
