import { verifyToken } from "@/helpers/verifyToken";

import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { postId } = body;
  console.log(postId);
  // 658412517776b84772491746
  try {
    const userId = await verifyToken(req);

    const post = await Post.findById(postId).populate("userId");
    if (!post)
      return NextResponse.json(
        { success: false, message: " post not found" },
        { status: 400 }
      );

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (followingId) => followingId.toString() !== userId.toString()
      );
      await post.save();
      return NextResponse.json(
        {
          success: true,
          post,
          message: "removed",
        },
        {
          status: 200,
        }
      );
    } else {
      post.likes.push(userId);
      await post.save();
      return NextResponse.json(
        {
          success: true,
          post,
          message: "added likes",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
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
