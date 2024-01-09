import { verifyToken } from "@/helpers/verifyToken";

import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

import Comment from "@/models/commentsModel";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { commentId } = body;
  // 658412517776b84772491746
  try {
    const userId = await verifyToken(req);

    const comment = await Comment.findById(commentId);
    if (!comment)
      return NextResponse.json(
        { success: false, message: " comment not found" },
        { status: 400 }
      );

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter(
        (followingId) => followingId.toString() !== userId.toString()
      );
      await comment.save();
      return NextResponse.json(
        {
          success: true,
          comment,
          message: "removed",
        },
        {
          status: 200,
        }
      );
    } else {
      comment.likes.push(userId);
      await comment.save();
      return NextResponse.json(
        {
          success: true,
          comment,
          message: "added likes",
        },
        {
          status: 200,
        }
      );
    }
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
