"use client";
import {
  deleteProfileAsync,
  getLoggedInUserAsync,
  selectUserNameError,
  selectUserObj,
  updateBioAsync,
  updateUserNameAsync,
} from "@/features/user/userSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector(selectUserObj);
  const userNameErrorA = useSelector(selectUserNameError);

  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState("");

  const [file, setFile] = useState();

  const [bio, setBio] = useState(user?.bio || "");
  const [username, setUserName] = useState(user?.username || "");
  const [bioError, setBioError] = useState();
  const [userNameError, setUserNameError] = useState();

  const previewFile = (handleFile) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(handleFile);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const upload = async () => {
    const formData = new FormData();

    formData.append("file", file);
    console.log("hello form");

    try {
      const res = await axios.post("/api/user-profile", formData);

      // console.log(res);
      console.log(res.data.postImage);

      return res.data.postImage;
    } catch (error) {
      console.log("from error upload", error);
    }
  };

  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    console.log("hello form");

    try {
      const res = await axios.post("/api/user-profile", formData);
      dispatch(getLoggedInUserAsync());
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const handleFile = e.target.files[0];

    setFile(handleFile);
    previewFile(handleFile);
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    if (bio.length < 1) {
      setBioError("enter bio ,bio has to be min of length 1");
      return;
    }

    dispatch(updateBioAsync(bio));
    setBioError(null);
  };
  const handleUserName = async (e) => {
    e.preventDefault();
    if (username.length < 4) {
      setUserNameError("enter valid username");
      return;
    }

    dispatch(updateUserNameAsync(username));
    setUserNameError(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = () => {
    dispatch(deleteProfileAsync());
    dispatch(getLoggedInUserAsync());
  };

  useEffect(() => {
    dispatch(getLoggedInUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      router.replace("/dashboard/profile");
    }
  }, [user, router]);
  return (
    <>
      {user && (
        <div className="mx-auto w-[80%] p-2">
          <div className="my-5 ">
            <h3 className="mb-2 text-lg">Update Your Bio</h3>
            <form onSubmit={handleBioSubmit}>
              <input
                type="text"
                className="border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
                placeholder="write your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              {bioError && <p>{bioError}</p>}
              <input type="submit" />
            </form>
          </div>

          <div className=" mb-5">
            <h3 className="mb-2 text-lg">Update Your UserName</h3>
            <form onSubmit={handleUserName}>
              <input
                type="textarea"
                className="border-b border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
                placeholder="write your userName"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
              />
              {userNameError && <p>{userNameError}</p>}
              {userNameErrorA && (
                <p className="text-red-500">{userNameErrorA}</p>
              )}
              <input type="submit" />
            </form>
          </div>

          <div className="">
            <h1 className="mb-2 text-lg">Edit Your Profile</h1>

            <button
              onClick={() => {
                handleDelete();
              }}
            >
              {" "}
              click here to delete profile
            </button>
            {!image ? (
              <Image
                className=" lg:aspect-auto[3/4]  lg:w-[563px] lg:h-[422px] object-contain "
                height={422}
                width={563}
                src={`/${user?.profileImage}`}
                alt="alt"
              />
            ) : (
              <Image
                className=" lg:aspect-auto[3/4]  lg:w-[563px] lg:h-[422px] object-contain "
                height={422}
                width={563}
                src={image}
                alt="alt"
              />
            )}

            <form onSubmit={handleSubmit}>
              <div class="flex items-center justify-center w-full my-5">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    required=""
                    id="file-input"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>

              <input type="submit" className="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
