import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);
    const posts = await Post.find().populate("userId").sort("-createdAt");
    let publicPosts = posts.filter((post) => !post.userId.isPrivate);
    publicPosts = publicPosts.filter((post) => post.userId._id !== userId);

    return NextResponse.json(
      {
        success: true,
        publicPosts,
      },
      {
        status: 200,
      }
    );
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
