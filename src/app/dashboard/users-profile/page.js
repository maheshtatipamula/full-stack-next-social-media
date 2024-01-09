"use client";

import { explorePostsAsync } from "@/features/post/postSlice";
import {
  getUsersAsync,
  selectSearchResults,
  selectUserObj,
  updateFollowersAsync,
} from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const UsersProfile = () => {
  const searchedUser = useSelector(selectSearchResults);
  const loggedUser = useSelector(selectUserObj);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  let user;

  if (searchedUser) {
    user = searchedUser;
  }
  console.log(user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    const searchUserName = user.username;
    await dispatch(getUsersAsync(searchUserName));

    dispatch(explorePostsAsync());
  };
  useEffect(() => {
    if (!user || !loggedUser) {
      router.push("/dashboard", { scroll: false });
    }
  }, [router]);

  return (
    <>
      {user && loggedUser && (
        <div className="w-[80%]   mx-auto relative">
          <div className=" flex gap-5 text-xl  h-auto mt-5">
            <div className="w-[38%] p-1 ">
              <Image
                src={`/${user?.profileImage}`}
                height={300}
                width={300}
                className=" rounded-full"
              />
            </div>
            <div className="flex flex-col justify-evenly w-[60%]">
              <div className="flex justify-between">
                <h1 className="text-2xl"> {user?.username}</h1>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {user._id === loggedUser._id ? (
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
                      onClick={() => handleFollowers(user._id)}
                    >
                      {loggedUser.following.includes(user._id)
                        ? "UnFollow"
                        : " Follow"}{" "}
                    </button>
                  )}
                  {user.id !== loggedUser._id && (
                    <BsThreeDotsVertical className=" h-[20px] w-[22.22222137451172px]" />
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <p>
                  <strong>posts</strong>
                  {user?.posts.length}
                </p>
                <p onClick={() => setShowFollowers(true)}>
                  <strong className="cursor-pointer">followers</strong>
                  {user?.followers.length}
                </p>
                <p>
                  <strong>following</strong>
                  {user?.following.length}
                </p>
              </div>
              <div>
                <p>{user?.bio}</p>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-white my-8"></div>

          {user.isPrivate && !loggedUser.following.includes(user._id) ? (
            <div>
              <p> this is a private account </p>
              <p>please follow to view posts</p>
            </div>
          ) : (
            <div>hey</div>
          )}
          {showFollowers && (
            <div className="absolute h-[100%] w-[100%] bg-slate-500 ">
              <button onClick={() => setShowFollowers(false)} className="">
                cross
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UsersProfile;
