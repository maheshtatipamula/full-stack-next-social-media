import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function POST(req) {
  try {
    const userId = await verifyToken(req);
    const data = await req.formData();
    const file = data.get("file");
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

    if (!file) {
      return NextResponse.json(
        { success: false, message: "no image found" },
        { status: 400 }
      );
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/Images/${file.name}`;
    await writeFile(path, buffer);
    const postImage = `Images/${file.name}`;

    return NextResponse.json(
      { success: true, message: " image successfully uploaded", postImage },
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
