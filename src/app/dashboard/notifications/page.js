"use client";
import NotificationObj from "@/components/user/Notifications";
import { selectUserObj } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
  const user = useSelector(selectUserObj);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {}, [user]);
  return (
    <>
      {user && user.notifications.length >= 1 ? (
        user.notifications.map((notification) => (
          <NotificationObj
            notification={notification}
            key={notification.userId}
          />
        ))
      ) : (
        <p className="text-2xl"> you have no notifications </p>
      )}
    </>
  );
};

export default Notifications;
