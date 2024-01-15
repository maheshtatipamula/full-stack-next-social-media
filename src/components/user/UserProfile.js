"use client";
import {
  explorePostsAsync,
  followersPostsAsync,
  singlePostAsync,
} from "@/features/post/postSlice";
import {
  fetchSavedPostsAsync,
  getLoggedInUserAsync,
  getUsersAsync,
  getUsersFollowingAsync,
  ownUsersPostsAsync,
  removeFollowersAsync,
  selectSavedPosts,
  selectUserFollowers,
  selectUserFollowing,
  selectUserObj,
  selectUserPosts,
  updateFollowersAsync,
} from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

import { useRouter } from "next/navigation";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUserObj);
  const userFollowers = useSelector(selectUserFollowers);
  const userFollowing = useSelector(selectUserFollowing);
  const usersPosts = useSelector(selectUserPosts);
  const savedPosts = useSelector(selectSavedPosts);

  const [showSaved, setShowSaved] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [FollowersRefresh, setFollowersRefresh] = useState(false);

  const handleShowFollowers = (id) => {
    dispatch(getUsersFollowingAsync(id));
    setShowFollowers(true);
  };

  const handleShowFollowing = (id) => {
    dispatch(getUsersFollowingAsync(id));
    setShowFollowing(true);
  };

  const handlePosts = async (postId) => {
    const res = await dispatch(singlePostAsync(postId));
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/single-post");
    }
  };

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    dispatch(followersPostsAsync());
    dispatch(getUsersFollowingAsync(user._id));
    setRefresh(!refresh);
    dispatch(explorePostsAsync());
  };

  const handleRemoveFollowers = async (friendId) => {
    await dispatch(removeFollowersAsync(friendId));
    setFollowersRefresh(!FollowersRefresh);
  };

  useEffect(() => {
    dispatch(fetchSavedPostsAsync());
    dispatch(explorePostsAsync());
    dispatch(ownUsersPostsAsync());
    dispatch(getLoggedInUserAsync());
    dispatch(followersPostsAsync());
    if (user) {
      dispatch(getUsersFollowingAsync(user._id));
    }
  }, [dispatch, refresh]);
  useEffect(() => {
    dispatch(getLoggedInUserAsync());
    if (user) {
      dispatch(getUsersFollowingAsync(user._id));
    }
  }, [dispatch, FollowersRefresh]);

  return (
    <>
      {user && (
        <div
          className={`px-2 py-1 md:p-0 md:w-[80%]   md:mx-auto relative ${
            showFollowers && "backdrop-blur-md"
          } `}
        >
          <div className=" flex md:gap-5  h-auto mt-5">
            <div className="w-[38%] p-1 ">
              <Image
                src={`/${user?.profileImage}`}
                height={300}
                width={300}
                className=" rounded-full"
                alt={user?.profileImage}
              />
            </div>
            <div className="flex flex-col justify-evenly w-[60%]">
              <div className="flex w-full gap-1 justify-between">
                <h1 className="text-lg overflow-ellipsis md:text-2xl">
                  {user?.username}
                </h1>
                <Link
                  href="/dashboard/edit-profile"
                  className="bg-slate-500 mr-5 w-[50px] h-[30px] text-center rounded-sm hover:bg-slate-600"
                >
                  {" "}
                  edit
                </Link>
              </div>
              <div className="flex gap-1 md:gap-2 justify-between">
                <p className="text-md md:text-xl">
                  <strong className="mr-1">posts</strong>
                  {user?.posts.length}
                </p>
                <p onClick={() => handleShowFollowers(user._id)}>
                  <strong className="cursor-pointer mr-1">followers</strong>
                  {user?.followers.length}
                </p>
                <p onClick={() => handleShowFollowing(user._id)}>
                  <strong className="cursor-pointer mr-1">following</strong>
                  {user?.following.length}
                </p>
              </div>
              <div className="overflow-auto">
                <p className=" overflow-ellipsis text-md md:text-lg">
                  {user?.bio}
                </p>
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-center mb-5 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap justify-center -mb-px">
              <li className="me-2">
                <p
                  onClick={() => {
                    setShowSaved(false);
                  }}
                  className={`inline-block p-4 ${
                    showSaved
                      ? "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      : " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  }`}
                >
                  Posts
                </p>
              </li>
              <li className="me-2">
                <p
                  onClick={() => {
                    setShowSaved(true);
                  }}
                  className={`inline-block p-4 ${
                    !showSaved
                      ? "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                      : " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  }`}
                  aria-current="page"
                >
                  Saved
                </p>
              </li>
            </ul>
          </div>
          {!showSaved && (
            <div className="mx-auto">
              <div className=" flex flex-wrap gap-2 w-[100%]  h-auto overflow-y-scroll scrollbar">
                {usersPosts &&
                  usersPosts.map((post) => {
                    return (
                      <Image
                        key={post._id}
                        src={`/${post?.Image}`}
                        onClick={() => handlePosts(post._id)}
                        className="w-[115px] h-[115px]  lg:w-[150px] lg:h-[150px]  xl:w-[160px] xl:h-[160px] mb-5 object-cover "
                        width={200}
                        height={200}
                        alt="posts"
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {showSaved && (
            <div className="flex flex-wrap gap-2 w-[100%] h-auto overflow-y-scroll scrollbar">
              {savedPosts &&
                savedPosts.map((post) => {
                  return (
                    <Image
                      key={post._id}
                      src={`/${post?.Image}`}
                      onClick={() => handlePosts(post._id)}
                      className="w-[115px] h-[115px]  lg:w-[150px] lg:h-[150px]  xl:w-[160px] xl:h-[160px] mb-5 object-cover "
                      width={200}
                      height={200}
                      alt="posts"
                    />
                  );
                })}
            </div>
          )}
          {user && showFollowers && userFollowers && (
            <div className="absolute h-[500px] w-[100%] bg-slate-500  top-[80px] p-5">
              <button onClick={() => setShowFollowers(false)} className="">
                <RxCross1 />
              </button>
              {userFollowers &&
                userFollowers.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex gap-2 mt-4 w-[100%] justify-around items-center"
                  >
                    <div className="flex gap-2">
                      <Image
                        src={`/${follower.profileImage}`}
                        alt="post author profile"
                        width={45}
                        height={45}
                        className=" border-2 border-white rounded-full"
                      />

                      <h1
                        className="self-start mt-2  text-2xl cursor-pointer "
                        onClick={() => handleClick(follower.username)}
                      >
                        {follower.username}
                      </h1>
                    </div>

                    <div>
                      <button
                        className="bg-slate-700 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                        onClick={() => handleRemoveFollowers(follower._id)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {user && showFollowing && userFollowing && (
            <div className="absolute h-[500px] w-[100%] bg-slate-500  top-[80px] p-5">
              <button onClick={() => setShowFollowing(false)} className="">
                <RxCross1 />
              </button>
              {userFollowing &&
                userFollowing.map((follower) => (
                  <div
                    key={follower._id}
                    className="flex gap-2 mt-4 w-[100%] justify-around items-center"
                  >
                    <div className="flex gap-2">
                      <Image
                        src={`/${follower.profileImage}`}
                        alt="post author profile"
                        width={45}
                        height={45}
                        className=" border-2 border-white rounded-full"
                      />

                      <h1
                        className="self-start mt-2  text-2xl cursor-pointer "
                        onClick={() => handleClick(follower.username)}
                      >
                        {follower.username}
                      </h1>
                    </div>

                    <div>
                      <button
                        className="bg-slate-700 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                        onClick={() => handleFollowers(follower._id)}
                      >
                        {user.following.includes(follower._id)
                          ? "UnFollow"
                          : " Follow"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
