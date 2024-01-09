import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PUT(req) {
  // 6582fbd93856a0f4808ba8a6
  const body = await req.json();
  const { friendId } = body;
  try {
    const userId = await verifyToken(req);
    if (userId === friendId) {
      return NextResponse.json(
        {
          success: false,
          message: "you cant follow yourself",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findById(userId).select("-password");
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

    if (!friend.isPrivate) {
      if (friend.followers.includes(user._id)) {
        user.following = user.following.filter(
          (followingId) => followingId.toString() !== friend._id.toString()
        );

        await user.save();

        friend.followers = friend.followers.filter(
          (followingId) => followingId.toString() !== user._id.toString()
        );

        await friend.save();
      } else {
        friend.followers.push(user._id);
        user.following.push(friend._id);
        await friend.save();
        await user.save();
      }
    } else {
      friend.notifications.push({ userId, type: "request" });
      await friend.save();
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
