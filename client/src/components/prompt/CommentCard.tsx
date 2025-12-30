"use client";
import { CommentType } from "@/pages/prompt/PromptPage";
import EditDelete from "../Button/EditDelete";
import { useState } from "react";

const CommentCard = ({
  id,
  rhfRegister,
  rhfHandleSubmit,
  errors,
  comments,
  onEditComment,
  commentVal
}: {
  id: string;
  rhfRegister: any;
  rhfHandleSubmit: any;
  errors: any;
  comments: CommentType[];
  onEditComment: any
  commentVal: string
}) => {

  return (
    <>
      {/* create comment */}
      <div>
        <form action="" onSubmit={rhfHandleSubmit}>
          <input
            type="text"
            placeholder="Comment..."
            defaultValue={commentVal}
            {...rhfRegister("comment", { required: true })}
          />
          <button type="submit">Submit</button>
        </form>
        {errors.comment && <p>{errors.comment.message}</p>}
      </div>

      {/* comments */}
      {comments.length > 0 ? (
        comments.map((comment: CommentType) => (
          <div key={comment._id} className="border my-2">
            <p>{comment.authorName}</p>
            <p>{comment.comment}</p>
            <p>{new Date(comment.createdAt).toLocaleDateString("en-GB")}</p>
            <EditDelete editHandler={() => { onEditComment(comment.comment) }} deleteHandler={() => {}} />
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </>
  );
};

export default CommentCard;
