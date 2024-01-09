import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          // Password should contain at least one capital letter, one special character, and one number
          const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/;
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least one capital letter, one special character, and one number",
      },
      minlength: [8, "Password must be at least 8 characters long"],
    },
    profileImage: {
      type: String,
      default: "profile/illustration-businessman_53876-5856.avif",
    },
    bio: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isPrivate: { type: Boolean, default: false },
    closeFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    notifications: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: String,
      },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    lastTimeUpdatedPassword: Date,
    pendingRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
