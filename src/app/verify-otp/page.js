"use client";
import axios from "axios";
import { useFormik } from "formik";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { verifyPasswordSchema } from "@/schema/verifyPasswordSchema";
import {
  selectForgotPasswordErrors,
  selectVerifyOtpToken,
  verifyOtpApiAsync,
} from "@/features/auth/authSlice";

const initialValues = {
  forgotPasswordOtp: "",
  newPassword: "",
  confirmPassword: "",
};

const VerifyOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const forgotPasswordErrors = useSelector(selectForgotPasswordErrors);
  const verifyOtpToken = useSelector(selectVerifyOtpToken);

  const setTimerPass = () => {
    setShowPass(true);
    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  };

  useEffect(() => {
    if (!verifyOtpToken) {
      router.push("/login", { scroll: false });
    }
  }, [verifyOtpToken, router]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: verifyPasswordSchema,
    onSubmit: async (values) => {
      const { forgotPasswordOtp, newPassword } = values;

      try {
        const res = await dispatch(
          verifyOtpApiAsync({ forgotPasswordOtp, newPassword, verifyOtpToken })
        );
        if (res.meta.requestStatus === "fulfilled") {
          router.replace("/login", { shallow: true });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="h-screen  grid lg:grid-cols-2  bg-sky-800  ">
      <div className="hidden lg:block  bg-white ">
        <div className=" flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <img
            src="https://img.freepik.com/free-vector/digital-lifestyle-concept-illustration_114360-7327.jpg?ga=GA1.1.1460011849.1689073367&semt=ais"
            alt="login"
          />
        </div>
      </div>
      <div className="  bg-gradient-to-r from-sky-800  to-gray-900 flex flex-col  justify-evenly">
        <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              update Your Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="forgotPasswordOtp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Otp
                </label>
                <div className="mt-2 relative">
                  <div className="absolute top-2 left-2">
                    <MdEmail />
                  </div>
                  <input
                    id="forgotPasswordOtp"
                    name="forgotPasswordOtp"
                    type="text"
                    placeholder="otp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.forgotPasswordOtp}
                    className="block w-full rounded-md pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {errors.forgotPasswordOtp && touched.forgotPasswordOtp ? (
                <p className="text-red-500">{errors.forgotPasswordOtp}</p>
              ) : null}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    NewPassword
                  </label>
                </div>
                <div className="mt-2 rounded-md relative ">
                  <div className="absolute top-2 left-2">
                    <FaLock />
                  </div>
                  <input
                    id="newPassword"
                    type={showPass ? "text" : "password"}
                    onChange={handleChange}
                    placeholder="password"
                    value={values.newPassword}
                    name="newPassword"
                    onBlur={handleBlur}
                    className="block w-full rounded-md  pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                  <div className="mr-1 absolute top-1 right-2 flex justify-center ">
                    {showPass ? (
                      <FaRegEyeSlash
                        onClick={() => setShowPass(false)}
                        style={{
                          height: "25px",
                          width: "20px",
                          background: "inherit",
                          margin: "auto",
                        }}
                      />
                    ) : (
                      <FaRegEye
                        onClick={() => setTimerPass()}
                        style={{
                          height: "25px",
                          width: "20px",
                          background: "inherit",
                          margin: "auto",
                        }}
                      />
                    )}{" "}
                  </div>
                </div>
              </div>
              {errors.newPassword && touched.newPassword ? (
                <p className="text-red-500">{errors.newPassword}</p>
              ) : null}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 rounded-md relative ">
                  <div className="absolute top-2 left-2">
                    <FaLock />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    placeholder="password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    className="block w-full rounded-md  pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                </div>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-red-500">{errors.confirmPassword}</p>
              ) : null}
              {forgotPasswordErrors && (
                <p className="text-red-500">{forgotPasswordErrors}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              click here to
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
{
  /* <div className="flex h-screen bg-blue-500">
<div className="m-auto bg-slate-500 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2  ">
  <div className="hidden lg:block"></div>
  <div className="flex flex-col bg-white justify-evenly">
    <div>login </div>
  </div>
</div>
</div> */
}
