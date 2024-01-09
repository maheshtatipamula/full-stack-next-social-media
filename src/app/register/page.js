"use client";
import { addToken } from "@/features/register/registerSlice";

import { signUpSchema } from "@/schema/signUpSchema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaRegEye, FaRegUser, FaUber, FaUser } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [resError, setResError] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const setTimerPass = () => {
    setShowPass(true);
    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        const { email, password, username } = values;
        try {
          const res = await axios.post("http://localhost:3000/api/register", {
            email,
            password,
            username,
          });
          if (res.status === 201 || 200) {
            router.replace("/email-verification");
            toast.success(res.data.message);

            dispatch(addToken(res.data.activationToken));
          }
        } catch (err) {
          setResError(err.response.data.message);
        }
      },
    });

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
              Create your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute top-2 left-2">
                    <MdEmail />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="email"
                    value={values.email}
                    onBlur={handleBlur}
                    className="block w-full rounded-md pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-500">{errors.email}</p>
              ) : null}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  UserName
                </label>
                <div className="mt-2 relative">
                  <div className="absolute top-2 left-2">
                    <FaUser />
                  </div>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="username"
                    value={values.username}
                    className="block w-full rounded-md pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                {errors.username && touched.username ? (
                  <p className="text-red-500">{errors.username}</p>
                ) : null}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 rounded-md relative ">
                  <div className="absolute top-2 left-2">
                    <FaLock />
                  </div>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    onChange={handleChange}
                    placeholder="password"
                    value={values.password}
                    name="password"
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
              {errors.password && touched.password ? (
                <p className="text-red-500">{errors.password}</p>
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

export default Register;
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
