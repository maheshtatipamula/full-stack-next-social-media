"use client";

import {
  commentPostAsync,
  deleteCommentOnPostAsync,
  explorePostsAsync,
  followersPostsAsync,
  likeCommentOnPostAsync,
  likePostAsync,
  selectExplorePosts,
} from "@/features/post/postSlice";
import {
  getUsersAsync,
  selectUserObj,
  updateFollowersAsync,
  updateSavedPostsAsync,
} from "@/features/user/userSlice";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { IoSave } from "react-icons/io5";

import { MdDeleteOutline } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { useRouter } from "next/navigation";

const Explore = () => {
  const posts = useSelector(selectExplorePosts);
  // console.log("from explore", posts);

  const user = useSelector(selectUserObj);
  // posts = posts.filter((post) => post.userId._id !== user?._id);

  const dispatch = useDispatch();
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [FollowerRefresh, setFollowerRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState();

  const handleLike = async (postId) => {
    await dispatch(likePostAsync(postId));
    setRefresh(!refresh);
  };

  const handleSavedPosts = async (postId) => {
    await dispatch(updateSavedPostsAsync(postId));
  };

  const handleFollowers = async (friendId) => {
    await dispatch(updateFollowersAsync(friendId));
    dispatch(followersPostsAsync());

    setFollowerRefresh(!FollowerRefresh);
  };

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };
  const handleComment = async (e, postId) => {
    e.preventDefault();
    await dispatch(commentPostAsync({ postId, comment }));
    setVisible(false);
    setComment(null);
    setRefresh(!refresh);
  };

  const handleDelete = async (commentId) => {
    await dispatch(deleteCommentOnPostAsync(commentId));
    dispatch(explorePostsAsync());
    setRefresh(!refresh);
  };

  const handleCommentLike = async (commentId) => {
    dispatch(likeCommentOnPostAsync(commentId));
    setRefresh(!refresh);
  };

  useEffect(() => {
    dispatch(explorePostsAsync());
  }, [dispatch, refresh]);

  useEffect(() => {
    dispatch(explorePostsAsync());
    dispatch(followersPostsAsync());
  }, [dispatch, FollowerRefresh]);

  return (
    <>
      {posts &&
        user &&
        posts.map((post) => (
          <div className=" mx-auto w-[90%] md:w-[80%] mb-5 p-2" key={post._id}>
            <div className="flex items-center mb-2 gap-2  ">
              <div className="flex items-center justify-between w-[100%] ">
                <div className="flex justify-center items-center gap-2">
                  <div className="flex justify-center items-center w-[48px] h-[48px] md:w-[68px] md:h-[68px] rounded-full bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900">
                    <Image
                      src={`/${post.userId.profileImage}`}
                      alt="post author profile"
                      width={68}
                      height={68}
                      className="w-[48px] h-[48px] md:w-[68px] md:h-[68px] border-2 border-white rounded-full"
                    />
                  </div>
                  <h1
                    className="self-start mt-2  text-md md:text-2xl cursor-pointer "
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
            <p className="text-sm">
              Posted {moment(post?.createdAt).fromNow()}
            </p>

            {visible && (
              <div>
                <form onSubmit={(e) => handleComment(e, post._id)}>
                  <span className="text-xl">{user.username}</span>
                  <input
                    type="text"
                    className="border-b w-[80%] border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
                    placeholder="add a comment "
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <button type="submit">post</button>
                </form>
              </div>
            )}
            {post.comments.length >= 1 && (
              <div className=" min-h-auto max-h-[150px] overflow-y-auto scrollbar  my-4">
                {post.comments.map((comment) => (
                  <div className="my-2  " key={comment._id}>
                    <div className="flex justify-between items-center gap-2  max-w-full">
                      <div>
                        <p className="mr-10 text-sm">
                          <span
                            className="text-md font-semibold md:text-xl mr-1 cursor-pointer "
                            onClick={() => handleClick(comment.userId.username)}
                          >
                            {comment.userId.username}
                          </span>

                          {comment.comment}
                        </p>
                      </div>
                      <div className="flex gap-2 ">
                        {comment.likes.includes(user._id.toString()) ? (
                          <button
                            className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                            onClick={() => handleCommentLike(comment._id)}
                          >
                            <FcLike className=" h-[20px] w-[22.22222137451172px]  " />
                          </button>
                        ) : (
                          <button
                            className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                            onClick={() => handleCommentLike(comment._id)}
                          >
                            <BsHeart className=" h-[20px] w-[22.22222137451172px]  " />
                          </button>
                        )}
                        {comment.userId._id === user._id && (
                          <MdDeleteOutline
                            onClick={() => handleDelete(comment._id)}
                            className=" h-[20px] w-[22.22222137451172px]"
                          />
                        )}
                      </div>
                    </div>

                    <p className="text-sm">
                      Posted {moment(comment?.createdAt).fromNow()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Explore;
