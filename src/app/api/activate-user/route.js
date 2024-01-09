import dbConnect from "@/config/dbConnect";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { activationCode, activationToken } = body;
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN);
    if (newUser.activationCode !== activationCode) {
      return NextResponse.json(
        { message: "unable able verify user please enter correct otp" },
        { status: 400 }
      );
    }
    const { email, password, username } = newUser.user;
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   throw new Error("user already exist");
    // }
    const user = await User.create({
      email,
      password,
      username,
    });
    return NextResponse.json(
      { message: "user created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    const message = error.message || "something went wrong";

    return NextResponse.json({ message }, { status: 400 });
  }
}
