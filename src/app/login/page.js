"use client";
import { loginSchema } from "@/schema/loginSchema";
import { useFormik } from "formik";
import Link from "next/link";

import React, { useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLoggedInUserAsync } from "@/features/user/userSlice";

const initialValues = {
  username: "",
  password: "",
};
const Login = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [showPass, setShowPass] = useState(false);
  const [resError, setResError] = useState();
  const router = useRouter();

  const setTimerPass = () => {
    setShowPass(true);
    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  };

  const dispatch = useDispatch();
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
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const res = await axios.post("/api/login", {
          username,
          password,
        });
        if (res.status === 200 || 201) {
          dispatch(getLoggedInUserAsync());
          router.replace("/dashboard", { shallow: true });
          toast.success("login successful");
        }
      } catch (err) {
        toast.error(err.response.data.message);
        setResError(err.response.data.message);
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
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute top-2 left-2">
                    <MdEmail />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    placeholder="mahesh_thatipamula"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    className="block w-full rounded-md pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {errors.username && touched.username ? (
                <p className="text-red-500">{errors.username}</p>
              ) : null}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 rounded-md relative ">
                  <div className="absolute top-2 left-2">
                    <FaLock />
                  </div>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    onChange={handleChange}
                    placeholder="Mahesh@123"
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
              {resError && <p className="text-red-500">{resError}</p>}

              <div>
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
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
