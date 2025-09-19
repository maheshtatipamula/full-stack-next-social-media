"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

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

  useEffect(() => {
     getLocationFromIP() 
    router.replace("/dashboard");
  }, []);
  return null;
};

export default Page;
