'use client'
import { useUser } from "@/stores/userStore";
import EditDelete from "../Button/EditDelete";

const PreviewPrompt = ({
  authorName,
  descriptionMasked,
  titleMasked,
  tags,
  likes,
  author,
  onReadMore,
  editPostHandler,
  deletePostHandler
}: {
  authorName: string;
  descriptionMasked: string;
  titleMasked: string;
  tags: string[];
  likes: string[];
  author: string;
  onReadMore: () => void
  editPostHandler: () => void
  deletePostHandler: () => void
}) => {
  const user = useUser((state: any) => state.user);
  
  return (
    <div className="border my-2">
      <div>Author: {authorName}</div>
      <div>Title: {titleMasked}</div>
      <div>Description: {descriptionMasked}</div>
      <div>Tags: {tags.join(", ")}</div>
      <div>Likes: {likes.length}</div>
      <div className="cursor-pointer text-blue-500" onClick={onReadMore}>read more...</div>
      {author === user?.userid && <EditDelete editHandler={editPostHandler} deleteHandler={deletePostHandler} />}
    </div>
  );
};

export default PreviewPrompt;
