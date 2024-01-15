"use client";
import { selectUserObj } from "@/features/user/userSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(selectUserObj);

  const [image, setImage] = useState("");

  const [file, setFile] = useState();

  const [back, setBack] = useState();
  const [post, setPost] = useState([]);

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

    try {
      const res = await axios.post("/api/post-image", formData);

      // console.log(res);

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
    const caption = "hey there this is the first post";
    try {
      const res = await axios.post("/api/posts", { caption, Image });
    } catch (error) {
      console.log(error);
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
  const handlePost = async () => {
    try {
      const res = await axios.get("/api/user-posts");
      if (res.status === 200) {
        setPost(res.data.publicPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async () => {
    try {
      const res = await axios.put("/api/follow-request", {
        friendId: "6582fa0d3856a0f4808ba8a1",
        accepted: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleBack();
    handlePost();
  }, []);

  return (
    <>
      <div className="add-blog">
        <img
          className="add-blog-img"
          src={
            image
              ? image
              : "https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?size=626&ext=jpg&ga=GA1.2.1460011849.1689073367&semt=sph"
          }
          alt="alt"
        />

        {back && <img src={`/${back}`} alt="kkii" />}
        {post.length >= 1 &&
          post.map((p) => (
            <>
              <img src={`/${p?.Image}`} alt="kkii" key="p.caption" />
              <p>{p.caption}</p>
            </>
          ))}
        {post.length >= 1 && <p>{post[0]?.caption} </p>}
        <div className="add-blog-content">
          <form onSubmit={handleSubmit}>
            <label>
              <span>Drop files here</span>
              or
              <input
                type="file"
                accept="image/*"
                required=""
                id="file-input"
                onChange={(e) => handleChange(e)}
              />
            </label>

            <input type="submit" className="submit" />
          </form>
        </div>
        <button onClick={handleRequest}>accept</button>
      </div>
    </>
  );
};

export default Profile;
