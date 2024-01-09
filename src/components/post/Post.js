"use client";

import React, { useEffect, useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  commentPostAsync,
  explorePostsAsync,
  followersPostsAsync,
  likePostAsync,
  selectExplorePosts,
  selectUserFollowersPosts,
} from "@/features/post/postSlice";
import {
  getUsersAsync,
  selectUserObj,
  updateFollowersAsync,
  updateSavedPostsAsync,
} from "@/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegSave } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import moment from "moment";

const Post = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState();
  const user = useSelector(selectUserObj);

  let posts = useSelector(selectExplorePosts);
  console.log("posts", posts);
  if (user) {
    posts = posts.filter((post) => post.userId._id !== user._id);
    posts = posts.filter((post) => user.following.includes(post.userId._id));
  }

  const router = useRouter();

  console.log(posts);

  const handleLike = async (postId) => {
    await dispatch(likePostAsync(postId));
    setRefresh(!refresh);
  };
  const handleSavedPosts = async (postId) => {
    await dispatch(updateSavedPostsAsync(postId));
    // setRefresh(!refresh);
  };

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    setRefresh(!refresh);
    dispatch(explorePostsAsync());
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    await dispatch(commentPostAsync({ postId, comment }));
    setVisible(false);
    setComment(null);
    setRefresh(!refresh);
  };

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };

  useEffect(() => {
    dispatch(explorePostsAsync());
  }, [dispatch, refresh]);

  return (
    <>
      {posts &&
        user &&
        posts.map((post) => (
          <div className=" mx-auto w-[80%] my-5 p-2" key={post._id}>
            <div className="flex items-center mb-2 gap-2  ">
              <div className="flex items-center justify-between w-[100%] ">
                <div className="flex justify-center items-center gap-2">
                  <div className="flex justify-center items-center h-[70px] w-[70px] rounded-full bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900">
                    <Image
                      src={`/${post.userId.profileImage}`}
                      alt="post author profile"
                      width={68}
                      height={68}
                      className=" border-2 border-white rounded-full"
                    />
                  </div>

                  <h1
                    className="self-start mt-2  text-2xl cursor-pointer "
                    onClick={() => handleClick(post.userId.username)}
                  >
                    {post.userId.username}
                  </h1>
                </div>
              </div>

              <div>
                <button
                  className="bg-slate-500 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
                  onClick={() => handleFollowers(post.userId._id)}
                >
                  {user.following.includes(post.userId._id)
                    ? "UnFollow"
                    : " Follow"}
                </button>
              </div>
              {user.id !== post.userId._id && (
                <BsThreeDotsVertical className=" h-[20px] w-[22.22222137451172px]" />
              )}
            </div>
            <div className="">
              <Image
                src={`/${post?.Image}`}
                className=" lg:aspect-auto[3/4]  lg:w-[563px] lg:h-[422px] object-contain"
                height={422}
                width={563}
                alt="posts"
              />
            </div>
            <div className="flex items-center justify-between  my-2  ">
              <div className="flex items-center gap-5 my-2 ">
                {post.likes.includes(user._id.toString()) ? (
                  <button
                    className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                    onClick={() => handleLike(post._id)}
                  >
                    <FcLike className=" h-[20px] w-[22.22222137451172px]  " />
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                    onClick={() => handleLike(post._id)}
                  >
                    <BsHeart className=" h-[20px] w-[22.22222137451172px]  " />
                  </button>
                )}
                <button
                  className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                  onClick={() => setVisible(!visible)}
                >
                  <FaRegComment className=" h-[20px] w-[22.22222137451172px]  " />
                </button>
              </div>

              <div>
                {user.savedPosts.includes(post._id.toString()) ? (
                  <button
                    className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                    onClick={() => handleSavedPosts(post._id)}
                  >
                    <IoSave className=" h-[20px] w-[22.22222137451172px]  " />
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                    onClick={() => handleSavedPosts(post._id)}
                  >
                    <FaRegSave className=" h-[20px] w-[22.22222137451172px]  " />
                  </button>
                )}
              </div>
            </div>
            <p>{post.likes.length} likes</p>
            <p>
              <span className="text-lg mr-2">{post.userId.username}</span>
              {post.caption ? post.caption : ""}
            </p>
            <p>Posted {moment(post?.createdAt).fromNow()}</p>
            {visible && (
              <div>
                <form onSubmit={(e) => handleComment(e, post._id)}>
                  <span className="text-xl">{user.username}</span>
                  <input
                    type="text"
                    className="border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
                    placeholder="add a comment "
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit">post</button>
                </form>
              </div>
            )}
            <div className="relative bg-blue-500">
              <p className="mr-10">
                <span className="text-xl">mahesh_thatipamula </span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque,
                culpa. Tenetur delectus optio maxime voluptatem voluptatum
                eveniet, rerum neque voluptates vero, nam corrupti quod
                accusamus porro quam doloribus illum pariatur!
              </p>
              <div className="flex gap-2 absolute  right-0 top-1 ">
                <FcLike className=" h-[20px] w-[22.22222137451172px]" />
                <MdDeleteOutline className=" h-[20px] w-[22.22222137451172px]" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Post;
