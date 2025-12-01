import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      required: true,
      default: "Anonymous", // Remove ts after implementing validation middleware
    },
    comment: {
      type: String,
      required: true,
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    type: {
      type: String,
      enum: ["comment", "reply"],
      default: "comment",
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    commentOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prompt",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
