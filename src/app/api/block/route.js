import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

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
    if (user.blocked.includes(friendId)) {
      user.blocked = user.blocked.filter(
        (followingId) => followingId.toString() !== friendId.toString()
      );
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "user unblocked",
        },
        {
          status: 200,
        }
      );
    } else {
      user.blocked.push(friendId);
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "user blocked",
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

export async function GET(req) {
  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId)
      .select("blocked")
      .populate("blocked");

    return NextResponse.json(
      {
        success: true,
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
