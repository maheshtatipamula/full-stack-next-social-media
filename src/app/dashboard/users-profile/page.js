"use client";

import {
  explorePostsAsync,
  followersPostsAsync,
  singlePostAsync,
} from "@/features/post/postSlice";
import {
  getUsersAsync,
  getUsersFollowingAsync,
  ownPublicUserPostsAsync,
  resetUsersProfile,
  selectPublicPosts,
  selectSearchResults,
  selectUserFollowers,
  selectUserFollowing,
  selectUserObj,
  updateFollowersAsync,
} from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const UsersProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const searchedUser = useSelector(selectSearchResults);
  const loggedUser = useSelector(selectUserObj);
  const publicPosts = useSelector(selectPublicPosts);
  const userFollowers = useSelector(selectUserFollowers);
  const userFollowing = useSelector(selectUserFollowing);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const handlePosts = async (post) => {
    let postId = post._id;
    const res = await dispatch(singlePostAsync(postId));

    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/single-post");
    }
  };

  let user;

  if (searchedUser) {
    user = searchedUser;
  }

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    const searchUserName = user.username;
    await dispatch(getUsersAsync(searchUserName));
    dispatch(followersPostsAsync());

    dispatch(explorePostsAsync());
  };

  const handleShowFollowers = async (user) => {
    const id = user._id;
    if (user.isPrivate) {
      if (loggedUser.following.includes(user._id)) {
        dispatch(getUsersFollowingAsync(id));
        setShowFollowers(true);
      }
    } else {
      dispatch(getUsersFollowingAsync(id));
      setShowFollowers(true);
    }
  };

  const handleShowFollowing = async (user) => {
    const id = user._id;
    if (user.isPrivate) {
      if (loggedUser.following.includes(user._id)) {
        dispatch(getUsersFollowingAsync(id));
        setShowFollowing(true);
      }
    } else {
      dispatch(getUsersFollowingAsync(id));
      setShowFollowing(true);
    }
  };

  useEffect(() => {
    if (!user || !loggedUser) {
      router.push("/dashboard", { scroll: false });
    }
    return () => {
      dispatch(resetUsersProfile);
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (user._id === loggedUser._id) {
        router.push("/dashboard/profile");
      }
      if (user.isPrivate) {
        if (loggedUser.following.includes(user._id)) {
          dispatch(ownPublicUserPostsAsync(user._id));
        }
      } else {
        dispatch(ownPublicUserPostsAsync(user._id));
      }
    }
  }, []);

  return (
    <>
      {user && loggedUser && (
        <div className="px-2 py-1 md:p-0 md:w-[80%]  mx-auto relative">
          <div className=" flex md:gap-5    h-auto mt-5">
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
                  {" "}
                  {user?.username}
                </h1>
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
                        : loggedUser.pendingRequest.includes(
                            user._id.toString()
                          )
                        ? "Requested"
                        : "Follow"}
                    </button>
                  )}
                  {user.id !== loggedUser._id && (
                    <BsThreeDotsVertical className=" h-[20px] w-[22.22222137451172px]" />
                  )}
                </div>
              </div>
              <div className="flex gap-1 md:gap-2 justify-between">
                <p className="text-md md:text-xl">
                  <strong className="mr-1">posts</strong>
                  {user?.posts.length}
                </p>
                <p
                  className="text-md md:text-xl "
                  onClick={() => handleShowFollowers(user)}
                >
                  <strong className="cursor-pointer mr-1">followers</strong>
                  {user?.followers.length}
                </p>
                <p
                  className="text-md md:text-xl "
                  onClick={() => handleShowFollowing(user)}
                >
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
          <div className="w-full border-b border-white my-8"></div>

          {user.isPrivate ? (
            loggedUser.following.includes(user._id) ? (
              <div className="mx-auto">
                <div className="flex flex-wrap gap-2 w-[90%] h-auto overflow-y-scroll scrollbar">
                  {publicPosts &&
                    publicPosts.map((post) => {
                      return (
                        <Image
                          key={post._id}
                          src={`/${post?.Image}`}
                          onClick={() => handlePosts(post)}
                          className="w-[120px] h-[120px]  lg:w-[150px] lg:h-[150px]  xl:w-[160px] xl:h-[160px] mb-5 object-cover "
                          width={200}
                          height={200}
                          alt="posts"
                        />
                      );
                    })}
                </div>
              </div>
            ) : (
              <div>
                <Image
                  src={`/padlock.png`}
                  className="mx-auto mb-4 mt-8"
                  // className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[450px] lg:h-[600px]   object-cover "
                  width={80}
                  height={80}
                  alt="posts"
                />
                <p className="text-center mb-2"> this is a private account </p>
                <p className="text-center">please follow to view posts</p>
              </div>
            )
          ) : (
            <div className="flex flex-wrap gap-2 w-[100%] h-auto overflow-y-scroll scrollbar">
              {publicPosts &&
                publicPosts.map((post) => {
                  return (
                    <Image
                      key={post._id}
                      src={`/${post?.Image}`}
                      onClick={() => handlePosts(post)}
                      className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[200px] lg:h-[200px]  mb-5 object-cover "
                      width={200}
                      height={200}
                      alt="posts"
                    />
                  );
                })}
            </div>
          )}

          {showFollowers && userFollowers && (
            <div className="absolute h-[500px] w-[100%] bg-slate-500  top-[80px] p-5 ">
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
                    {loggedUser._id === follower._id ? (
                      <div>
                        <button className="bg-transparent mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600 text-transparent  px-2">
                          Follow
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-slate-700 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                          onClick={() => handleFollowers(follower._id)}
                        >
                          {loggedUser.following.includes(user._id)
                            ? "UnFollow"
                            : loggedUser.pendingRequest.includes(
                                user._id.toString()
                              )
                            ? "Requested"
                            : "Follow"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
          {showFollowing && userFollowing && (
            <div className="absolute h-[500px] w-[100%] bg-slate-500  top-[80px] p-5 ">
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
                    {loggedUser._id === follower._id ? (
                      <div>
                        <button className="bg-transparent mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600 text-transparent  px-2">
                          Follow
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-slate-700 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                          onClick={() => handleFollowers(follower._id)}
                        >
                          {loggedUser.following.includes(user._id)
                            ? "UnFollow"
                            : loggedUser.pendingRequest.includes(
                                user._id.toString()
                              )
                            ? "Requested"
                            : "Follow"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UsersProfile;
