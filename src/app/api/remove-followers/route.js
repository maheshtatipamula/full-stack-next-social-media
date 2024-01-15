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
          message: "you cant do this operation",
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

    if (friend.following.includes(user._id)) {
      user.followers = user.followers.filter(
        (followingId) => followingId.toString() !== friend._id.toString()
      );

      await user.save();

      friend.following = friend.following.filter(
        (followingId) => followingId.toString() !== user._id.toString()
      );

      await friend.save();
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "cannot perform the action",
        },
        {
          status: 200,
        }
      );
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
    //console.log(error);
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
