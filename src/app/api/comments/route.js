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
    post.comments.push(commented._id);
    await post.save();

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
