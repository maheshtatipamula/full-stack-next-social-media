import { verifyToken } from "@/helpers/verifyToken";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";
import Comment from "@/models/commentsModel";

dbConnect();

export async function POST(req) {
  const body = await req.json();
  const { postId, comment } = body;

  try {
    const userId = await verifyToken(req);

    const post = await Post.findById(postId);
    if (!post)
      return NextResponse.json(
        { success: false, message: " post not found" },
        { status: 400 }
      );

    const commented = await Comment.create({ userId, postId, comment });
    return NextResponse.json(
      {
        success: true,
        commented,
        message: "comment uploaded successfully",
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
  const body = await req.json();
  const { commentId } = body;
  //   6582fa0d3856a0f4808ba8a1

  try {
    const userId = await verifyToken(req);

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    // Check if the user making the request is the owner of the comment
    if (comment.userId.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this comment",
        },
        { status: 403 }
      );
    }

    // If the comment is associated with a post, remove the commentId from the post's comments array
    if (comment.postId) {
      const post = await Post.findById(comment.postId);
      if (post) {
        post.comments = post.comments.filter(
          (id) => id.toString() !== commentId
        );
        await post.save();
      }
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return NextResponse.json(
      { success: true, message: "Comment deleted successfully" },
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
