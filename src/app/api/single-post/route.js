import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id } = body;
    const userId = await verifyToken(req);

    const post = await Post.findById(id).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "userId",
      },
    });

    if (!post)
      return NextResponse.json(
        {
          success: false,
          message: "post not found",
        },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      {
        success: true,
        post,
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
