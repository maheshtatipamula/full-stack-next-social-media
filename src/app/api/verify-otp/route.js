import dbConnect from "@/config/dbConnect";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

dbConnect();

export async function POST(req) {
  try {
    const body = await req.json();
    let { verifyOtpToken, forgotPasswordOtp, newPassword } = body;
    console.log(body);
    console.log(verifyOtpToken);

    const newUser = jwt.verify(verifyOtpToken, process.env.FORGOT_PASSWORD);
    if (!newUser) {
      return NextResponse.json(
        {
          success: false,
          message: "timedOut,token valid only for five mins",
        },
        { status: 400 }
      );
    }
    if (newUser.forgotPasswordOtp !== forgotPasswordOtp) {
      return NextResponse.json(
        { message: "unable able verify user please enter correct otp" },
        { status: 400 }
      );
    }
    const { username } = newUser.user;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
    if (newPasswordMatch)
      return NextResponse.json(
        {
          success: false,
          message: "newPassword can't be same as oldPassword",
        },
        { status: 400 }
      );

    const salt = await bcrypt.genSaltSync(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      { message: "password updated successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") {
      return NextResponse.json(
        {
          success: false,
          message: "timedOut,token valid only for five mins",
        },
        { status: 400 }
      );
    }

    const message = error.message || "something went wrong";

    return NextResponse.json({ message }, { status: 400 });
  }
}
