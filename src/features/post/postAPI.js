import axios from "axios";

export function uploadPost({ Image, caption }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/post-image", {
        Image,
        caption,
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

export function editPost({ postId, caption }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/post-image", {
        postId,
        caption,
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

export function deletePost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);

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

export function followersPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/followers-posts");

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

export function explorePosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/user-posts");

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

export function likePost(postId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/likes", {
        postId,
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

export function commentPost({ postId, comment }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/api/comments", {
        postId,
        comment,
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

export function deleteCommentOnPost({ commentId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete("/api/comments", {
        commentId,
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

export function likeCommentOnPost({ commentId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put("/api/comment-likes", {
        commentId,
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
