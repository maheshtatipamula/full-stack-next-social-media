import jwt from "jsonwebtoken";

export function verifyJwt(token) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
