"use client";
import {
  commentRefresh,
  deleteCommentOnPostAsync,
  followersPostsAsync,
} from "@/features/post/postSlice";
import { selectUserObj } from "@/features/user/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserObj);
  const [userName, setUserName] = useState();
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (commentId) => {
    dispatch(deleteCommentOnPostAsync(commentId));
    dispatch(commentRefresh(!refresh));
    setRefresh(!refresh);
  };
  useEffect(() => {
    dispatch(followersPostsAsync());
  }, [refresh, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      if (comment) {
        try {
          const res = await axios.get(`/api/get-users/${comment.userId}`);
          setUserName(res.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchData();
  }, [comment]);

  return (
    <>
      {userName && (
        <div className="relative my-1" key={comment}>
          <p className="mr-10">
            {userName && (
              <span className="text-xl mr-2">{userName.username}</span>
            )}
            {comment.comment}
          </p>
          <div className="flex gap-2 absolute  right-0 top-1 ">
            <FcLike className=" h-[20px] w-[22.22222137451172px]" />
            {comment.userId === user._id && (
              <MdDeleteOutline
                onClick={() => handleDelete(comment._id)}
                className=" h-[20px] w-[22.22222137451172px]"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
