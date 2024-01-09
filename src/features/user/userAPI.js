import axios from "axios";

export function getLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/user");

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

export function updateBio(bio) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/update-bio", { bio });

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

export function deleteBio() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete("/api/update-bio");

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

export function updateProfile(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/user-profile", { formData });

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

export function deleteProfile() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete("/api/user-profile");

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

export function updateUserName(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/user", { username });

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

export function updateFollowers(friendId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/user-followers", { friendId });

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

export function getUsers(searchUserName) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/get-users", {
        searchUserName,
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

export function getAllUsers(searchUserName) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/all-users");

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

export function updateCloseFriends(friendId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/close-friends", { friendId });

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

export function updateSavedPosts(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/saved-posts", { postId });

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

export function fetchSavedPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/saved-posts");

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

export function updatePrivacy() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/privacy", {});

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

export function LogoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/logout");

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
