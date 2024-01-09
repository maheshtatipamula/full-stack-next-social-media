import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);
    console.log(typeof userId, userId);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    // Fetch posts from followers
    const followersPosts = await fetchFollowersPosts(user.following);
    console.log(user);

    return NextResponse.json(
      {
        success: true,
        followersPosts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    if (error.message === "jwt expired") {
      const response = NextResponse.json(
        { message: error.message },
        { status: 401 }
      );

      response.cookies.delete("token");

      return response;
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function fetchFollowersPosts(followerIDs) {
  try {
    const userIDs = followerIDs.map((follower) => follower.toString());

    // Fetch posts from the users followed by the current user
    const posts = await Post.find({ userId: { $in: userIDs } });
    console.log("posts:", posts);

    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching followers' posts");
  }
}
