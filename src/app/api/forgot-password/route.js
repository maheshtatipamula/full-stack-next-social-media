import dbConnect from "@/config/dbConnect";
import sendEmail from "@/helpers/emailCtrl";
import forgotPasswordActivationToken from "@/helpers/forgotPasswordActivationToken";
import User from "@/models/userModel";

import { NextResponse } from "next/server";

dbConnect();

export async function POST(req) {
  const body = await req.json();
  const { username } = body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't Exist" },
        { status: 400 }
      );
    }

    const activationToken = forgotPasswordActivationToken(body);
    const forgotPasswordOtp = activationToken.forgotPasswordOtp;
    const resetUrl = `<p>hey ${body.username}<br>
    Thank You For Registering<br> this is activation Code ${forgotPasswordOtp} and valid for the next five mins<p>`;

    const data = {
      to: user.email,
      text: `hey ${body.username} this is the activation Code ${forgotPasswordOtp}`,
      subject: `verify  otp to update password`,
      html: resetUrl,
    };

    sendEmail(data);

    return NextResponse.json(
      {
        message: "OTP sent successfully to the email. Please check your email.",
        verifyOtpToken: activationToken.verifyOtpToken,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error.message || "something went wrong";

    return NextResponse.json({ message }, { status: 400 });
  }
}
