import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function DELETE(req, { params }) {
  try {
    const { postId } = params;
    const userId = await verifyToken(req);

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // Check if the user making the request is the owner of the post
    if (post.userId.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this post",
        },
        { status: 403 }
      );
    }

    // await Comment.deleteMany({ postId });

    const user = await User.findById(userId);
    if (user) {
      user.posts = user.posts.filter(
        (userPostId) => userPostId.toString() !== postId
      );
      await user.save();
    }

    await post.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message: "Post and associated comments deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // //console.log(error);
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

export async function GET(req, { params }) {
  try {
    const userId = await verifyToken(req);
    const { postId } = params;

    let post = await Post.findById(postId)
      .populate("userId")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "userId",
        },
      });

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
