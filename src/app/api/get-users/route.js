import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { searchUserName } = body;

    const userId = await verifyToken(req);
    const user = await User.findOne({ username: searchUserName });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        {
          success: false,

          message: "user Not Found",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        user,
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
