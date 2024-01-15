"use client";

import {
  commentPostAsync,
  deleteCommentOnPostAsync,
  deletePostAsync,
  editPostAsync,
  likeCommentOnPostAsync,
  likePostAsync,
  selectSinglePost,
  singlePostAsync,
} from "@/features/post/postSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaRegSave } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  fetchSavedPostsAsync,
  getUsersAsync,
  selectUserObj,
  updateSavedPostsAsync,
} from "@/features/user/userSlice";
import moment from "moment";
import axios from "axios";

const SinglePost = () => {
  const user = useSelector(selectUserObj);
  const post = useSelector(selectSinglePost);
  const router = useRouter();
  const dispatch = useDispatch();

  const [caption, setCaption] = useState();
  const [showCaption, setShowCaption] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState();

  const handleSavedPosts = async (postId) => {
    await dispatch(updateSavedPostsAsync(postId));

    dispatch(fetchSavedPostsAsync());
  };

  const handleEdit = async () => {
    setCaption(post.caption || null);
    setShowCaption(!showCaption);
  };

  const handleDelete = async (postId) => {
    const res = await dispatch(deletePostAsync(postId));
    setRefresh(!refresh);
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/dashboard/profile");
    }
  };

  const handleEditCaption = async (e, postId) => {
    e.preventDefault();
    await dispatch(editPostAsync({ postId, caption }));
    dispatch(singlePostAsync(postId));
    setRefresh(!refresh);

    setShowCaption(false);
    setCaption(null);
  };

  const handleLike = async (postId) => {
    const res = await dispatch(likePostAsync(postId));

    setRefresh(!refresh);
    setpost(res.payload);
  };

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    await dispatch(commentPostAsync({ postId, comment }));
    const id = postId;
    try {
      const res = await axios.put("/api/single-post", { id });
      setComment("");
      //   setpost(res.data.post);
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
    setComment("");

    setRefresh(!refresh);
  };

  const handleCommentLike = async (commentId) => {
    await dispatch(likeCommentOnPostAsync(commentId));
    const id = post._id;
    try {
      const res = await axios.put("/api/single-post", { id });
      setpost(res.data.post);
    } catch (error) {
      console.log(error);
    }
    setRefresh(!refresh);
  };

  const handleCommentDelete = async (commentId) => {
    await dispatch(deleteCommentOnPostAsync(commentId));

    const id = post._id;
    try {
      const res = await axios.put("/api/single-post", { id });
      post(res.data.post);
    } catch (error) {
      console.log(error);
    }

    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!post) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (post) {
      dispatch(singlePostAsync(post._id));
    }
  }, [dispatch, refresh]);

  return (
    <>
      {post && user && (
        <div className=" mx-auto w-[90%] md:w-[80%] my-5 p-2" key={post._id}>
          <div className="flex items-center mb-2 gap-2  ">
            <div className="flex items-center justify-between w-[100%] ">
              <div className="flex justify-center items-center gap-2">
                <div className="flex justify-center items-center w-[48px] h-[48px] md:w-[68px] md:h-[68px] rounded-full bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900">
                  <Image
                    src={`/${post.userId.profileImage}`}
                    alt="post author profile"
                    width={68}
                    height={68}
                    className="w-[48px] h-[48px] md:w-[68px] md:h-[68px]  border-2 border-white rounded-full"
                  />
                </div>

                <h1
                  className="self-start mt-2 text-md md:text-2xl cursor-pointer "
                  onClick={() => handleClick(post.userId.username)}
                >
                  {post.userId.username}
                </h1>
              </div>
            </div>

            {user._id !== post.userId._id && (
              <div className="relative inline-block group">
                <BsThreeDotsVertical
                  // onClick={() => handleThreeDots(post.userId._id)}
                  className=" h-[20px] w-[22.22222137451172px] group-hover:cursor-pointer"
                />
                <div className="hidden group-hover:block absolute bg-slate-500 rounded-md right-0 border border-gray-200 shadow-md w-[200px] cursor-pointer p-4 z-10">
                  <p onClick={() => handleCloseFriends(post.userId._id)}>
                    {user.closeFriends.includes(post.userId._id)
                      ? " remove from close friends"
                      : "add to close friends"}
                  </p>
                </div>
              </div>
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
              {user._id === post.userId._id && (
                <button
                  className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                  onClick={() => handleEdit(post._id)}
                >
                  <GoPencil className=" h-[20px] w-[22.22222137451172px]  " />
                </button>
              )}
              {user._id === post.userId._id && (
                <button
                  className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                  onClick={() => handleDelete(post._id)}
                >
                  <AiFillDelete className=" h-[20px] w-[22.22222137451172px]  " />
                </button>
              )}
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
          <p className="text-sm">Posted {moment(post?.createdAt).fromNow()}</p>
          {showCaption && (
            <div>
              <form onSubmit={(e) => handleEditCaption(e, post._id)}>
                <span className="text-xl">{user.username}</span>
                <input
                  type="text"
                  className="border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
                  placeholder="add a comment "
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
                <button type="submit">post</button>
              </form>
            </div>
          )}
          {visible && (
            <div>
              <form onSubmit={(e) => handleComment(e, post._id)}>
                <span className="text-xl">{user.username}</span>
                <input
                  type="text"
                  className="border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
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
              {" "}
              {post.comments.map((comment) => (
                <div className=" my-2  " key={comment._id}>
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
                    <div className="flex gap-2    ">
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
                          onClick={() => handleCommentDelete(comment._id)}
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
      )}
    </>
  );
};

export default SinglePost;
