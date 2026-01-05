import { CommentType } from "@/pages/prompt/PromptPage";
import { useOptions, useUser } from "@/stores/userStore";
import EditDelete from "../Button/EditDelete";
import CreatePrompt from "../user/CreatePrompt";
import { useForm, SubmitHandler } from "react-hook-form";

export interface PromptCardProps {
  data: {
    _id: string;
    author: string;
    authorName: string;
    title: string;
    prompt: string;
    description: string;
    tags: string[];
    likes: number;
    comments: CommentType[];
    createdAt: string;
  };
  editPromptHandler: (data: any) => void;
  editPrompt: any;
  deletePrompt: any
}

const PromptCard = ({
  data,
  editPromptHandler,
  editPrompt,
  deletePrompt
}: PromptCardProps) => {
  const user = useUser((state) => state.user);
  const setEditPrompt = useOptions((state) => state.setEditPrompt);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // console.log("in prompt card: ", data);
  return (
    <div>
      {editPrompt?._id === data?._id ? (
        <div>
          <CreatePrompt
            rhfRegister={register}
            rhfHandleSubmit={handleSubmit(editPromptHandler)}
            errors={errors}
            defaultValue={editPrompt}
          />
        </div>
      ) : (
        <>
          <div>{data?.authorName || "Anonymous"}</div>
          <div>{data?.title || "No title"}</div>
          <div>{data?.prompt || "No prompt"}</div>
          <div>{data?.description || "No description"}</div>
          <div>{data?.tags || "No tags"}</div>
          <div>{data?.likes || "No likes"}</div>
          <div>
            {new Date(data?.createdAt).toLocaleDateString("en-GB") || "No date"}
          </div>
        </>
      )}
      {data?.author === user?.userid && (
        <EditDelete
          setEditHandler={() => {
            setEditPrompt(data);
          }}
          DeleteHandler={() => deletePrompt(data?._id)}
        />
      )}
    </div>
  );
};

export default PromptCard;
