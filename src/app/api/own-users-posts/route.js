import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);

    let users = await User.findById(userId)
      .select("-password")
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "comments",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "userId _id",
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        users,
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
