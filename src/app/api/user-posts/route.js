import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";
import Comment from "@/models/commentsModel";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId);
    Comment.findById(userId);
    let posts = await Post.find()
      .populate("userId")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "userId",
        },
      })
      .sort("-createdAt");
    posts = posts.filter((post) => !post.userId.isPrivate);
    posts = posts.filter(
      (post) => post.userId._id.toString() !== userId.toString()
    );
    posts = posts.filter((post) => !user.following.includes(post.userId._id));

    return NextResponse.json(
      {
        success: true,
        posts,
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
