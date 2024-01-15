import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import Post from "@/models/postsModel";

dbConnect();

export async function GET(req) {
  try {
    const userId = await verifyToken(req);

    const user = await User.findById(userId).select("-password");
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

    // Fetch posts from savedPosts
    const savedPosts = await fetchSavedPosts(user.savedPosts);

    return NextResponse.json(
      {
        success: true,
        user,
        savedPosts,
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
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Function to fetch posts from an array of saved post IDs
async function fetchSavedPosts(savedPostIDs) {
  try {
    const posts = await Post.find({ _id: { $in: savedPostIDs } }).populate({
      path: "comments",
      populate: {
        path: "userId",
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching saved posts");
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { postId } = body;

  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId).select("-password");
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "post doesn't exist" },
        { status: 400 }
      );
    }
    if (user.savedPosts.includes(postId)) {
      user.savedPosts = user.savedPosts.filter(
        (followingId) => followingId.toString() !== postId.toString()
      );
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "removed from saved Posts",
        },
        {
          status: 200,
        }
      );
    } else {
      user.savedPosts.push(postId);
      await user.save();
      return NextResponse.json(
        {
          success: true,
          user,
          message: "added to saved posts",
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
