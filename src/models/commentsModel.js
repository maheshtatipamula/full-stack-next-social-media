import mongoose from "mongoose";

// const replySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     reply: {
//       type: String,
//       required: true,
//     },
//     likes: [],
//   },
//   { timestamps: true }
// );

const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: [],

    // replyComments: [replySchema],
  },
  { timestamps: true }
);

// Export the model
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentsSchema);

export default Comment;
