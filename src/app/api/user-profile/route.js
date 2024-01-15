import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
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
    const fileName = `IMG-${Date.now()}-${file.name}`;
    const filePath = path.join("./public/profile", fileName);

    await writeFile(filePath, buffer);
    user.profileImage = `profile/${fileName}`;
    await user.save();

    // await writeFile(path, buffer);
    // user.profileImage = `profile/${file.name}`;
    // await user.save();

    return NextResponse.json(
      { success: true, message: " image successfully uploaded", user },
      { status: 200 }
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
export async function DELETE(req) {
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

    user.profileImage = `profile/illustration-businessman_53876-5856.avif`;
    await user.save();

    return NextResponse.json(
      { success: true, message: " profile deleted successfully ", user },
      { status: 200 }
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
