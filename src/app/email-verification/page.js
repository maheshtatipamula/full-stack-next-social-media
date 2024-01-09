"use client";
import { selectActivationToken } from "@/features/register/registerSlice";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

import { useSelector } from "react-redux";

const EmailVerification = () => {
  const [activationCode, setActivationCode] = useState();

  const [resError, setResError] = useState();
  const activationToken = useSelector(selectActivationToken);
  const router = useRouter();

  useEffect(() => {
    if (!activationToken) {
      router.push("/register", { scroll: false });
    }
  }, [activationToken, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/activate-user", {
        activationCode,
        activationToken,
      });
      if (res == 200 || 201) router.push("/login", { scroll: false });
    } catch (err) {
      setResError(err.response.data.message);
    }
  };

  return (
    <div className="  grid lg:grid-cols-2 h-screen  ">
      <div className="hidden lg:block ">
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <img
            src="https://img.freepik.com/free-vector/digital-lifestyle-concept-illustration_114360-7327.jpg?ga=GA1.1.1460011849.1689073367&semt=ais"
            alt="login"
          />
        </div>
      </div>
      <div className="  bg-gradient-to-r from-sky-800  to-gray-900 flex flex-col  justify-evenly">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              verify your email
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Otp
                </label>
                <div className="mt-2 rounded-md relative ">
                  <div className="absolute top-2 left-2">
                    <FaLock />
                  </div>
                  <input
                    id="otp"
                    type="text"
                    placeholder="enter your otp"
                    value={activationCode}
                    name="otp"
                    onChange={(e) => setActivationCode(e.target.value)}
                    className="block w-full rounded-md  pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                </div>
              </div>

              <div>
                {resError && <p className="text-red-500">{resError}</p>}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              click here to
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
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
