"use client";
import { selectUserObj } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
  const user = useSelector(selectUserObj);
  const dispatch = useDispatch();
  const router = useRouter();
  if (user && user.notifications) {
  }
  useEffect(() => {
    if (!user) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <>
      {user &&
        user.notifications.map((noti) => (
          <div key={noti.userId}>
            <p>{noti.userId}</p>
            {
              (noti.type = "request" && (
                <div>
                  <button> accept</button>
                  <button> reject</button>
                </div>
              ))
            }
            <p>{noti.type}</p>
          </div>
        ))}
    </>
  );
};

export default Notifications;
