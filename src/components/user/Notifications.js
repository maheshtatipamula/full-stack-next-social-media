"use client";

import { getLoggedInUserAsync } from "@/features/user/userSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

import { useDispatch } from "react-redux";

const NotificationObj = ({ notification }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userName, setUserName] = useState();

  const handleClick = async (username) => {
    dispatch(getUsersAsync(username));
    router.push("/dashboard/users-profile");
  };

  const handleAccepted = async ({ friendId, accepted }) => {
    try {
      const res = await axios.put("/api/follow-request", {
        friendId,
        accepted,
      });
      await dispatch(getLoggedInUserAsync());
      setUserName(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (notification) {
        try {
          const res = await axios.get(`/api/get-users/${notification.userId}`);
          setUserName(res.data.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchData();
  }, [notification]);

  return (
    <>
      {notification && (
        <div className="relative my-1 w-full px-3 md:p-0 md:w-[80%] mx-auto">
          {notification.type === "request" && userName && (
            <div className="flex items-center justify-between w-[100%] ">
              <div className="flex  items-center gap-2">
                {/* <div className="flex justify-center items-center h-[60px] w-[60px] rounded-full bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900"> */}
                <Image
                  src={`/${userName.profileImage}`}
                  alt="post author profile"
                  width={68}
                  height={68}
                  className="w-[48px] h-[48px] md:w-[68px] md:h-[68px] border-2 border-white rounded-full"
                />
                {/* </div> */}
                <h1
                  className="self-start mt-2 text-md  md:text-2xl cursor-pointer "
                  onClick={() => handleClick(userName.username)}
                >
                  {userName.username}
                </h1>
                <span className="ml-1 text-xs md:text-md">
                  wants to follow you
                </span>
              </div>
              <div className="flex gap-3 md:gap-0">
                <button
                  className="bg-slate-500 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2 hidden md:inline-block"
                  onClick={() =>
                    handleAccepted({ friendId: userName._id, accepted: true })
                  }
                >
                  accept
                </button>
                <button
                  className="bg-slate-500 mr-5 w-[auto] h-[30px] text-center rounded-sm hover:bg-slate-600  px-2 hidden md:inline-block"
                  onClick={() =>
                    handleAccepted({ friendId: userName._id, accepted: false })
                  }
                >
                  reject
                </button>

                <TiTickOutline
                  className="h-[20px] w-[22.22222137451172px] md:hidden"
                  onClick={() =>
                    handleAccepted({ friendId: userName._id, accepted: true })
                  }
                />

                <RxCross2
                  className="h-[20px] w-[22.22222137451172px] md:hidden"
                  onClick={() =>
                    handleAccepted({ friendId: userName._id, accepted: false })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationObj;
