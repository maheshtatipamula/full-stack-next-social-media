import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { accepted, friendId } = body;
  try {
    const userId = await verifyToken(req);

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        }
      );

    const friend = await User.findById(friendId);
    if (!friend)
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        }
      );

    if (accepted) {
      if (friend.following.includes(user._id)) {
        user.followers = user.followers.filter(
          (followingId) => followingId.toString() !== user._id.toString()
        );

        await user.save();
        friend.following = friend.following.filter(
          (followingId) => followingId.toString() !== friend._id.toString()
        );

        await friend.save();
      } else {
        user.followers.push(user._id);
        friend.following.push(friend._id);
        await friend.save();
        await user.save();
      }
    } else {
      user.notifications = user.notifications.filter(
        (notification) =>
          notification.userId.toString() !== userId.toString() ||
          notification.type !== "request"
      );
      await user.save();
      //remove from friend pending list
    }
    return NextResponse.json(
      {
        success: true,
        friend,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error.message === "jwt expired") {
      const response = NextResponse.json(
        { message: error.message },
        { status: 401 }
      );

      response.cookies.delete("token");

      return response;
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
