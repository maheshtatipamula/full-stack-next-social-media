"use client";
import Image from "next/image";
import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineAddComment } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useParams, usePathname } from "next/navigation";

const HomeLayout = ({ children }) => {
  const pathname = usePathname();

  const routes = ["/"];

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/email-verification" ||
    !pathname.includes(routes)
  ) {
    return <>{children}</>;
  }
  return (
    <div className="bg-black h-screen text-white">
      <div
        className="absolute top-0 left-0 h-full  rounded-r-2xl md:w-1/7 xl:w-80 p-10 hidden md:block "
        style={{ boxShadow: "0 0 2px rgba(255, 255, 255, 1)" }}
      >
        <div className="my-8">
          <Image
            src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
            alt="avatar"
            width={100}
            height={100}
            className="mx-auto  hidden lg:block"
          />{" "}
          <Image
            src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
            alt="avatar"
            width={35}
            height={35}
            className="mx-auto   lg:hidden"
          />
          <h1 className="text-center  hidden lg:block mt-2 text-2xl  xl:text-4xl">
            {" "}
            Instagram
          </h1>
        </div>

        <div className="my-5 flex flex-col justify-evenly h-auto">
          <div className="flex items-center gap-3  mb-10 lg:mb-5">
            <GoHomeFill style={{ height: "25px", width: "25px" }} />
            <h1 className="text-2xl hidden lg:block"> Home</h1>
          </div>{" "}
          <div className="flex items-center gap-3  mb-10 lg:mb-5">
            <FaMagnifyingGlass style={{ height: "25px", width: "25px" }} />
            <h1 className="text-2xl hidden lg:block"> Search</h1>
          </div>{" "}
          <div className="flex items-center gap-3  mb-10 lg:mb-5">
            <MdOutlineExplore style={{ height: "25px", width: "25px" }} />
            <h1 className="text-2xl hidden lg:block"> Explore</h1>
          </div>{" "}
          <div className="flex items-center gap-3  mb-10 lg:mb-5">
            <MdOutlineAddComment style={{ height: "25px", width: "25px" }} />
            <h1 className="text-2xl hidden lg:block"> Create</h1>
          </div>{" "}
          <div className="flex items-center gap-3  mb-10 lg:mb-5">
            <RxAvatar style={{ height: "25px", width: "25px" }} />
            <h1 className="text-2xl hidden lg:block"> Profile</h1>
          </div>
        </div>
      </div>
      <div
        className="absolute md:hidden  top:0 h-12 w-full flex items-center justify-between "
        style={{ boxShadow: "0 0 2px rgba(255, 255, 255, 1)" }}
      >
        <div className="flex gap-2 ml-5">
          <Image
            src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
            alt="avatar"
            width={35}
            height={35}
            className=" "
          />{" "}
          <h1 className=""> Instagram</h1>
        </div>
        <div className="mr-5">
          <MdOutlineExplore style={{ height: "25px", width: "25px" }} />
        </div>
      </div>

      <div className=" absolute flex items-center w-full mb-2 h-12 justify-evenly md:hidden bottom-0 ">
        <GoHomeFill style={{ height: "25px", width: "25px" }} />
        <MdOutlineExplore style={{ height: "25px", width: "25px" }} />
        <MdOutlineAddComment style={{ height: "25px", width: "25px" }} />
        <FaMagnifyingGlass style={{ height: "25px", width: "25px" }} />
        <RxAvatar style={{ height: "25px", width: "25px" }} />
      </div>

      <div className=" md:w-[60%] lg:w-[50%]  mx-auto pt-[60px]   md:pt-8">
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
{
  /* <div className=" absolute top-16 mx-2   md:top-10 md:left-36 lg:top-10 lg:left-96"></div> */
}
