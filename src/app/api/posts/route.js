import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function POST(req) {
  const body = await req.json();
  const { Image, caption } = body;

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
    const post = await Post.create({ Image, caption, userId });
    user.posts.push(post._id);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        post,
        message: "post uploaded successfully",
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

export async function PUT(req) {
  const body = await req.json();
  const { caption, postId } = body;

  try {
    const userId = await verifyToken(req);
    const post = await Post.findById(postId);
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
    if (post.userId.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to edit this post",
        },
        { status: 403 }
      );
    }

    post.caption = caption;
    await post.save();

    return NextResponse.json(
      {
        success: true,
        post,
        message: "post updated successfully",
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

export async function DELETE(req) {
  try {
    const { postId } = await req.params;
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

    // const user = await User.findById(userId);
    // if (user) {
    //   user.posts = user.posts.filter(
    //     (userPostId) => userPostId.toString() !== postId
    //   );
    //   await user.save();
    // }

    await post.remove();

    return NextResponse.json(
      {
        success: true,
        message: "Post and associated comments deleted successfully",
      },
      { status: 200 }
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
