import axios from "axios";

export function updatePasswordApi({ oldPassword, newPassword }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/update-password", {
        oldPassword,
        newPassword,
      });

      const data = response.data;
      resolve({ data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Request failed";

        reject(errorMessage);
      } else if (error.request) {
        reject("No response received from the server");
      } else {
        reject("Error setting up the request");
      }
    }
  });
}

export function forgotPasswordApi(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/forgot-password", {
        username,
      });

      const data = response.data;
      resolve({ data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Request failed";

        reject(errorMessage);
      } else if (error.request) {
        reject("No response received from the server");
      } else {
        reject("Error setting up the request");
      }
    }
  });
}
export function verifyOtpApi({
  forgotPasswordOtp,
  newPassword,
  verifyOtpToken,
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/verify-otp", {
        forgotPasswordOtp,
        newPassword,
        verifyOtpToken,
      });

      const data = response.data;
      resolve({ data });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Request failed";

        reject(errorMessage);
      } else if (error.request) {
        reject("No response received from the server");
      } else {
        reject("Error setting up the request");
      }
    }
  });
}
