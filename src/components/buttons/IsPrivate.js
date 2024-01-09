"use client";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const IsPrivate = () => {
  const handleIsPrivate = async () => {
    try {
      const res = await axios.put("/api/privacy", {});

      toast.success(" successful");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div onClick={handleIsPrivate} className="cursor-pointer">
      IsPrivate
    </div>
  );
};

export default IsPrivate;
