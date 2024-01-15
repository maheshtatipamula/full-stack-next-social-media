"use client";

import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resetState } from "@/features/post/postSlice";

export function AppWrapper({ children }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res.status === 200) {
        router.replace("/login", { shallow: true });
        toast.success(res.data.message);
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (
          error.response.status === 401 ||
          error.response.data.message === "jwt expired"
        ) {
          handleLogout();
        }

        return Promise.reject(error);
      } else if (error.request) {
        return Promise.reject("No Response From The Server");
      } else {
        return Promise.reject("something went wrong wrong");
      }
    }
  );

  return <Provider store={store}>{children}</Provider>;
}
