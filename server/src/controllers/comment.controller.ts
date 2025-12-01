import { createComment, getComments, updateComment, deleteComment } from "../services/comment.service";
import { updatePrompt } from "../services/prompt.service";

export const createCommentController = async (req: any, res: any) => {
  req.body.authorName = req.username;
  req.body.commentOn = req.params.id;
  req.body.author = req.userid;
  const comment = await createComment(req.body);
  await updatePrompt(req.params.id, { 
    $push: { comments: comment._id }
   });
  return res.status(201).json(comment);
};

export const getCommentsController = async (req: any, res: any) => {
  const comments = await getComments(req.params.id);
  return res.status(200).json(comments);
};

export const updateCommentController = async (req: any, res: any) => {
  const id = req.params.id;
  const data = req.body;
  const comment = await updateComment(id, data);
  return res.status(200).json(comment);
};

export const deleteCommentController = async (req: any, res: any) => {
  const id = req.params.id;
  const comment = await deleteComment(id);
  return res.status(200).json(comment);
};