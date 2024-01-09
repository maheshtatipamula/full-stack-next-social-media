"use client";
import { explorePostsAsync } from "@/features/post/postSlice";
import { selectUserObj } from "@/features/user/userSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Create = () => {
  const user = useSelector(selectUserObj);
  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [caption, setCaption] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

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
      const res = await axios.post("/api/post-image", formData);

      // console.log(res);
      console.log(res.data.postImage);

      return res.data.postImage;
    } catch (error) {
      console.log("from error upload", error);
    }
  };

  const handleChange = (e) => {
    const handleFile = e.target.files[0];

    setFile(handleFile);
    previewFile(handleFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Image = await upload();
    try {
      const res = await axios.post("/api/posts", { caption, Image });
      console.log(res);
      toast.success(res.data.message);
      dispatch(explorePostsAsync());
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleBack = async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        setBack(res.data.user.profileImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleRequest = async () => {
  //   try {
  //     const res = await axios.put("/api/follow-request", {
  //       friendId: "6582fa0d3856a0f4808ba8a1",
  //       accepted: true,
  //     });
  //     if (res.status === 200) {
  //       console.log(res);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(post);

  // useEffect(() => {
  //   handleBack();
  //   handlePost();
  // }, []);

  return (
    <>
      <div className="mx-auto w-[80%] p-1">
        <Image
          className=""
          height={400}
          width={400}
          src={
            image
              ? image
              : "https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?size=626&ext=jpg&ga=GA1.2.1460011849.1689073367&semt=sph"
          }
          alt="alt"
        />

        <div className="add-blog-content">
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
                  className="mx-auto"
                  type="file"
                  accept="image/*"
                  required=""
                  id="file-input"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
            <input
              type="textarea"
              placeholder="caption"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              className="border-b w-[50%]  border-gray-300 focus:border-sky-500 outline-none bg-transparent ml-2"
            />

            <input type="submit" className="submit" />
          </form>
        </div>
        {/* <button onClick={handleRequest}>accept</button> */}
      </div>
    </>
  );
};

export default Create;
