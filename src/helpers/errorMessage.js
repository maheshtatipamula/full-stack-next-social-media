// errorResponse.js

import { NextResponse } from "next/server";

export const handleErrorResponse = (
  message,
  status,
  deleteTokenCookie = false
) => {
  const response = NextResponse.json({ message }, { status });

  if (deleteTokenCookie) {
    response.cookies.delete("token");
  }

  return response;
};
