// api/login.js

import dbConnect from "@/config/dbConnect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/config/jwtToken";

dbConnect();

// export async function POST(req){
//   const body=await req.json()
//   const user = await User.findOne({
//     $or: [{ username }, { email: username }],
//   });
//   if(user){
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if(passwordMatch){
//       const
//     }
//   }
// }

export async function POST(req) {
  const body = await req.json();
  const { username } = body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = await generateToken(user._id);
    const { password, ...newUserObject } = {
      user,
    };

    const response = NextResponse.json(
      { message: "Login Successful", newUserObject },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    return response; // Make sure to return a response here
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
