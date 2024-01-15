import dbConnect from "@/config/dbConnect";
import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

dbConnect();

export async function PUT(req) {
  const body = await req.json();

  let { newPassword, oldPassword } = body;

  try {
    const userId = await verifyToken(req);
    const user = await User.findById(userId);
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
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (passwordMatch) {
      const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
      if (newPasswordMatch)
        return NextResponse.json(
          {
            success: true,
            message: "newPassword can't be same as oldPassword",
          },
          { status: 400 }
        );
      const salt = await bcrypt.genSaltSync(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      user.password = newPassword;
      user.lastTimeUpdatedPassword = Date.now();
      await user.save();

      return NextResponse.json(
        { success: true, message: "password updated successfully!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "oldPassword is Incorrect" },
        { status: 400 }
      );
    }
  } catch (error) {
    //console.log(error);

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
    );
  }
}
