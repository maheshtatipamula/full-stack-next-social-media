import jwt from "jsonwebtoken";

const forgotPasswordActivationToken = (user) => {
  const forgotPasswordOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const verifyOtpToken = jwt.sign(
    {
      user,
      forgotPasswordOtp,
    },
    process.env.FORGOT_PASSWORD,
    {
      expiresIn: "5m",
    }
  );

  return { verifyOtpToken, forgotPasswordOtp };
};

export default forgotPasswordActivationToken;
