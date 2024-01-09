import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);

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

export async function PUT(req) {
  try {
    const body = await req.json();
    const { username } = body;
    const userId = await verifyToken(req);

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

    const existingUserName = await User.findOne({ username });

    if (existingUserName) {
      return NextResponse.json(
        { message: "UserName already Taken,Try Something Else" },
        { status: 400 }
      );
    }
    user.username = username;
    await user.save();

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
