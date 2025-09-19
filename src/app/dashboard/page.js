import Post from "@/components/post/Post";
import Profile from "@/components/post/Profile";
import Stories from "@/components/stories/Stories";
import React,{useEffect} from "react";

const DashBoard = () => {

  async function getLocationFromIP() {
    try {
        const res = await fetch("http://ip-api.com/json/");
        const data = await res.json();
        console.log("22 data", data);

        return {
            ip: data.query,
            city: data.city,
            region: data.regionName,
            country: data.country,
            lat: data.lat,
            lon: data.lon,
        };
    } catch (err) {
        console.error("Error fetching IP location:", err);
        return null;
    }
}

  useEffect(()=>{
    console.log("getLocationFromIP")
    getLocationFromIP()
  },[])
  return (
    <>
      <Stories />
      <Post />
    </>
  );
};

export default DashBoard;
