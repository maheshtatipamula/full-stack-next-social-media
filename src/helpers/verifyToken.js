import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { handleErrorResponse } from "./errorMessage";

export const verifyToken = asyncHandler(async (req) => {
  try {
    const token = req.cookies.get("token")?.value;

    // const accessToken = req.cookies.accessToken || null;
    // const refreshToken = req.cookies.refreshToken || null;
    // console.log("accessToken", accessToken);
    // console.log("refreshToken", refreshToken);

    if (!token) {
      throw new Error("User is Not Authenticated");
    }
    // if (!refreshToken) {
    //   throw new Error("Please Login again");
    // }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      throw new Error("access token is not valid");
    }

    return decoded.id;
  } catch (err) {
    throw new Error(err.message);
  }
});
