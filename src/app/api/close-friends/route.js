import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { friendId } = body;

  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId).select("-password");
    const friend = await User.findById(friendId);
    if (!friend) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 400 }
      );
    }
    if (user.closeFriends.includes(friendId)) {
      user.closeFriends = user.closeFriends.filter(
        (followingId) => followingId.toString() !== friendId.toString()
      );
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "removed from closeFriends",
        },
        {
          status: 200,
        }
      );
    } else {
      user.closeFriends.push(friendId);
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "added from close Friends",
        },
        {
          status: 200,
        }
      );
    }
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
