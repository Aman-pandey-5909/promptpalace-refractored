"use client";
import { CommentType } from "@/pages/prompt/PromptPage";
import EditDelete from "../Button/EditDelete";
import { useEffect, useState } from "react";
import { useOptions } from "@/stores/userStore";
import { shallow } from "zustand/shallow";

const CommentCard = ({
  id,
  rhfRegister, 
  rhfHandleSubmit,
  errors,
  comments,
  editCommentHandler,
  editComment,
  deleteComment
}: {
  id: string;
  rhfRegister: any;
  rhfHandleSubmit: any;
  errors: any;
  comments: CommentType[];
  editCommentHandler: any;
  editComment: { comment: string; commentId: string } | null
  deleteComment: any
}) => {
  // const editComment = useOptions((state) => state.editComment);
  const setEditComment = useOptions((state) => state.setEditComment);

  const onClickEditHandler = (comment: string, commentId: string) => {
    setEditComment({comment, commentId})
  }

  return (
    <>
      {/* create comment */}
      <div>
        <form action="" onSubmit={rhfHandleSubmit}>
          <input
            type="text"
            placeholder="Comment..."
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
            {editComment?.commentId === comment._id ? (
              <form action="" onSubmit={editCommentHandler}>
                <input type="text" defaultValue={editComment.comment} onChange={(e) => setEditComment({comment: e.target.value, commentId: comment._id})} />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <p>{comment.comment}</p>
            )}
            <p>{new Date(comment.createdAt).toLocaleDateString("en-GB")}</p>
            <EditDelete setEditHandler={() => onClickEditHandler(comment.comment, comment._id)} DeleteHandler={() => deleteComment(comment._id)} />
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </>
  );
};

export default CommentCard;
