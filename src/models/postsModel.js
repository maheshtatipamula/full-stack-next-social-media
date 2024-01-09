import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "true",
    },
    Image: {
      type: String,
      required: [true, "Image is required"],
    },
    caption: {
      type: String,
    },
    likes: [],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// Export the model
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
