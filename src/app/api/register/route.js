import dbConnect from "@/config/dbConnect";
import createActivationToken from "@/helpers/createActivationToken";
import sendEmail from "@/helpers/emailCtrl";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

dbConnect();

export async function POST(req) {
  const body = await req.json();
  const { username, email, password } = body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already Exist" },
        { status: 400 }
      );
    }
    const existingUserName = await User.findOne({ username });

    if (existingUserName) {
      return NextResponse.json(
        { message: "UserName already Taken,Try Something Else" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSaltSync(10);
    body.password = await bcrypt.hash(body.password, salt);
    const activationToken = createActivationToken(body);
    const activationCode = activationToken.activationCode;
    const resetUrl = `<p>hey ${body.username}<br>
    Thank You For Registering<br> this is activation Code ${activationCode} and valid for the next five mins<p>`;

    const data = {
      to: email,
      text: `hey ${body.username} this is the activation Code ${activationCode}`,
      subject: `activate your account`,
      html: resetUrl,
    };

    sendEmail(data);

    return NextResponse.json(
      { message: "confirm your email", activationToken: activationToken.token },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
    );
  }
}
