"use client";
import {
  commentPostAsync,
  deletePostAsync,
  explorePostsAsync,
  likePostAsync,
  selectExplorePosts,
} from "@/features/post/postSlice";
import {
  fetchSavedPostsAsync,
  selectSavedPosts,
  selectUserObj,
  updateSavedPostsAsync,
} from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
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

const UserProfile = () => {
  const user = useSelector(selectUserObj);
  const posts = useSelector(selectExplorePosts);
  console.log("from log", posts);
  const [showSaved, setShowSaved] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [detailedPost, setdetailedPost] = useState();
  const dispatch = useDispatch();
  const savedPosts = useSelector(selectSavedPosts);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState();
  const [refresh, setRefresh] = useState(false);

  const handlePosts = (post) => {
    setShowPost(true);
    setdetailedPost(post);
  };
  const closePost = () => {
    setShowPost(false);
    setdetailedPost(null);
  };

  const handleDelete = async (postId) => {
    await dispatch(deletePostAsync(postId));
    setShowPost(false);
    setdetailedPost(null);
  };

  const handleEditPost = () => {};
  const handleLike = async (postId) => {
    const res = await dispatch(likePostAsync(postId));
    console.log(res);
    setRefresh(!refresh);
    setdetailedPost(res.payload);
  };

  // const handleSavedLike = async (postId) => {
  //   await dispatch(likePostAsync(postId));

  //   dispatch(fetchSavedPostsAsync());
  //   dispatch(explorePostsAsync());
  //   setRefresh(!refresh);
  //   const delpos = savedPosts.filter((p) => p._id === postId);
  //   setdetailedPost(delpos[0]);
  // };

  const handleSavedPosts = async (postId) => {
    await dispatch(updateSavedPostsAsync(postId));
    dispatch(fetchSavedPostsAsync());
    // setRefresh(!refresh);
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    await dispatch(commentPostAsync({ postId, comment }));
    setVisible(false);
    setComment(null);
    setRefresh(!refresh);
  };

  console.log(detailedPost);
  useEffect(() => {
    dispatch(fetchSavedPostsAsync());
    dispatch(explorePostsAsync());
  }, [dispatch, refresh]);

  return (
    <>
      {user && (
        <div
          className={`w-[80%]   mx-auto relative ${
            showFollowers && "backdrop-blur-md"
          } `}
        >
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
                <Link
                  href="/dashboard/edit-profile"
                  className="bg-slate-500 mr-5 w-[50px] h-[30px] text-center rounded-sm hover:bg-slate-600"
                >
                  {" "}
                  edit
                </Link>
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
            <div className="flex flex-wrap gap-2 w-[100%] h-auto overflow-y-scroll scrollbar">
              {posts &&
                posts.map((post) => {
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
          {showSaved && (
            <div className="flex flex-wrap gap-2 w-[100%] h-auto overflow-y-scroll scrollbar">
              {savedPosts &&
                savedPosts.map((post) => {
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
          {showFollowers && (
            <div className="absolute h-[500px] w-[100%] bg-slate-500  top-[80px]">
              <button onClick={() => setShowFollowers(false)} className="">
                <RxCross1 />
              </button>
            </div>
          )}
          {posts && detailedPost && (
            <div className="absolute  h-[600px] w-[110%] bg-slate-500  top-[80px]">
              <div className=" flex relative w-auto">
                <Image
                  key={detailedPost._id}
                  src={`/${detailedPost?.Image}`}
                  className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[450px] lg:h-[600px]   object-cover "
                  width={500}
                  height={600}
                  alt="posts"
                />
                <div className="p-2 overflow-y-scroll scrollbar">
                  <div className="flex  gap-1 w-[100%]">
                    <Image
                      src={`/${detailedPost.userId.profileImage}`}
                      alt="post author profile"
                      width={45}
                      height={45}
                      className=" border-2 border-white rounded-full"
                    />
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {detailedPost.userId.username}
                    </p>
                    <button
                      onClick={() => closePost()}
                      className="absolute top-2 right-2 "
                    >
                      <RxCross1 />
                    </button>
                  </div>
                  <div className="flex items-center gap-5 my-2  ">
                    <div className="flex items-center gap-5 my-2 ">
                      {detailedPost &&
                      detailedPost?.likes.length >= 1 &&
                      detailedPost?.likes.includes(user._id.toString()) ? (
                        <button
                          className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                          onClick={() => handleLike(detailedPost._id)}
                        >
                          <FcLike className=" h-[20px] w-[22.22222137451172px]  " />
                        </button>
                      ) : (
                        <button
                          className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                          onClick={() => handleLike(detailedPost._id)}
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
                      {user.savedPosts.includes(detailedPost._id.toString()) ? (
                        <button
                          className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                          onClick={() => handleSavedPosts(detailedPost._id)}
                        >
                          <IoSave className=" h-[20px] w-[22.22222137451172px]  " />
                        </button>
                      ) : (
                        <button
                          className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                          onClick={() => handleSavedPosts(detailedPost._id)}
                        >
                          <FaRegSave className=" h-[20px] w-[22.22222137451172px]  " />
                        </button>
                      )}
                    </div>
                    {detailedPost.userId._id === user._id && (
                      <button
                        className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                        onClick={() => handleDelete(detailedPost._id)}
                      >
                        <AiFillDelete className=" h-[20px] w-[22.22222137451172px]  " />
                      </button>
                    )}
                    {detailedPost.userId._id === user._id && (
                      <button
                        className="flex justify-center items-center rounded-0 mr-13.78 p-0 border-none bg-transparent cursor-pointer outline-none"
                        onClick={() => handleDelete(detailedPost._id)}
                      >
                        <GoPencil className=" h-[20px] w-[22.22222137451172px]  " />
                      </button>
                    )}
                  </div>
                  <p>
                    <span className="text-lg  mr-2">
                      {detailedPost.userId.username}
                    </span>
                    {detailedPost.caption ? detailedPost.caption : ""}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;

// {user.followers.length>=1 && (
//   user.followers.map((follower)=>    <ul key={follower.id}
//     role="list"
//     className="divide-y divide-gray-200 dark:divide-gray-700 w-[80%]"
//   >
//     <Link href={"/dashboard/users-profile"}>
//       <li className="py-3 sm:py-4">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             <Image
//               src={`/${user.profileImage}`}
//               alt="post author profile"
//               width={68}
//               height={68}
//               className=" border-2 border-white rounded-full"
//             />
//           </div>
//           <div className="flex-1 min-w-0 ms-4">
//             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//               {user.username}
//             </p>
//             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//               {user.email}
//             </p>
//           </div>
//           <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//             {user._id === user._id ? (
//               <Link
//                 href="/dashboard/edit-profile"
//                 className="bg-slate-500 mr-5 w-[50px] h-[30px] text-center rounded-sm hover:bg-slate-600"
//               >
//                 {" "}
//                 edit
//               </Link>
//             ) : (
//               <button
//                 className="bg-slate-500 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2"
//                 onClick={() => handleFollowers(user._id)}
//               >
//                 {user.following.includes(user._id)
//                   ? "UnFollow"
//                   : " Follow"}
//               </button>
//             )}
//           </div>
//         </div>
//       </li>
//     </Link>
//   </ul>)

// )}
