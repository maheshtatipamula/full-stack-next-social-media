"use client";

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa";

import { FaLock, FaRegEye } from "react-icons/fa";

import {
  clearUpdatePasswordErrors,
  selectUpdatePasswordErrors,
  updatePasswordApiAsync,
} from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { updatePasswordSchema } from "@/schema/updatePasswordSchema";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setNewShowPass] = useState(false);
  const resError = useSelector(selectUpdatePasswordErrors);

  const dispatch = useDispatch();
  const router = useRouter();

  const setTimerPass = () => {
    setShowPass(true);
    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  };
  const setNewTimerPass = () => {
    setNewShowPass(true);
    setTimeout(() => {
      setNewShowPass(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      dispatch(clearUpdatePasswordErrors());
    };
  }, []);

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
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      const { oldPassword, newPassword } = values;
      try {
        const res = await dispatch(
          updatePasswordApiAsync({ oldPassword, newPassword })
        );
        if (res.meta.requestStatus === "fulfilled") {
          resetForm();
          router.replace("/dashboard/settings", { shallow: true });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="mx-auto w-[80%]">
      <form className="space-y-6 " noValidate onSubmit={handleSubmit}>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium leading-6"
            >
              oldPassword
            </label>
          </div>
          <div className="mt-2 rounded-md relative ">
            <div className="absolute top-2 left-2">
              <FaLock className="text-black" />
            </div>
            <input
              id="oldPassword"
              type={showPass ? "text" : "password"}
              onChange={handleChange}
              placeholder="oldPassword"
              value={values.oldPassword}
              name="oldPassword"
              onBlur={handleBlur}
              className="block w-full rounded-md  pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            <div className="mr-1 absolute top-1 right-2 flex justify-center ">
              {showPass ? (
                <FaRegEyeSlash
                  className="text-black"
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
                  className="text-black"
                  onClick={() => setTimerPass()}
                  style={{
                    height: "25px",
                    width: "20px",
                    background: "inherit",
                    margin: "auto",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {errors.oldPassword && touched.oldPassword ? (
          <p className="text-red-500">{errors.oldPassword}</p>
        ) : null}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 "
            >
              newPassword
            </label>
          </div>
          <div className="mt-2 rounded-md relative ">
            <div className="absolute top-2 left-2">
              <FaLock className="text-black" />
            </div>
            <input
              id="newPassword"
              type={showNewPass ? "text" : "password"}
              onChange={handleChange}
              placeholder="newPassword"
              value={values.newPassword}
              name="newPassword"
              onBlur={handleBlur}
              className="block w-full rounded-md  pl-8 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            <div className="mr-1 absolute top-1 right-2 flex justify-center ">
              {showNewPass ? (
                <FaRegEyeSlash
                  className="text-black"
                  onClick={() => setNewShowPass(false)}
                  style={{
                    height: "25px",
                    width: "20px",
                    background: "inherit",
                    margin: "auto",
                  }}
                />
              ) : (
                <FaRegEye
                  className="text-black"
                  onClick={() => setNewTimerPass()}
                  style={{
                    height: "25px",
                    width: "20px",
                    background: "inherit",
                    margin: "auto",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {errors.newPassword && touched.newPassword ? (
          <p className="text-red-500">{errors.newPassword}</p>
        ) : null}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 "
          >
            Confirm Password
          </label>
          <div className="mt-2 rounded-md relative ">
            <div className="absolute top-2 left-2">
              <FaLock className="text-black" />
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
            update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
