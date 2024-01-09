import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { bio } = body;

  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId).select("-password");
    user.bio = bio;
    await user.save();
    return NextResponse.json(
      {
        success: true,
        user,
        message: "bio successfully updated",
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

export async function DELETE(req) {
  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId).select("-password");
    user.bio = null;
    await user.save();
    return NextResponse.json(
      {
        success: true,
        user,
        message: "bio successfully deleted",
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
