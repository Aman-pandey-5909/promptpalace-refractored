"use client";
import PromptCard from "@/components/prompt/PromptCard";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import { PromptCardProps } from "@/components/prompt/PromptCard";
import CommentCard from "@/components/prompt/CommentCard";
import { useForm, SubmitHandler } from "react-hook-form";
import { useOptions, useUser } from "@/stores/userStore";
import { useRouter } from "next/navigation";

export interface CommentType {
  _id: string;
  authorName: string;
  comment: string;
  createdAt: string;
}

const PromptPage = ({ id }: { id: string }) => {
  const emptyPrompt: PromptCardProps["data"] = {
    _id: "",
    authorName: "",
    author: "",
    title: "",
    prompt: "",
    description: "",
    tags: [],
    likes: 0,
    comments: [],
    createdAt: "",
  };

  const router = useRouter();
  const [prompt, setPrompt] = useState({ ...emptyPrompt } as PromptCardProps["data"]);
  const [errormessage, setErrormessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createComment: SubmitHandler<any> = async (data) => {
    try {
      const response = await API.post(`/comment/${id}`, data, {
        withCredentials: true,
      });
      setPrompt((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) => comment._id === response.data.comment._id ? response.data.comment : comment),
      }));
    } catch (error) {
      setErrormessage(error as string);
    }
  };

  async function getPrompt() {
    try {
      const response = await API.get(`/prompt/${id}`, {
        withCredentials: true,
      });
      
      setPrompt(response.data.prompt);
      console.log(response.data.prompt);
    } catch (error) {
      setErrormessage(error as string);
    }
  }


  const editComment = useOptions((state) => state.editComment);
  const editPrompt = useOptions((state) => state.editPrompt);
  const setEditPrompt = useOptions((state) => state.setEditPrompt);

  async function editCommentHandler() {
    try {
      const response = await API.patch(`/comment/${editComment?.commentId}`, { comment: editComment?.comment }, {
        withCredentials: true,
      });
      setPrompt((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) => comment._id === response.data.comment._id ? response.data.comment : comment),
      }));
    } catch (error) {
      setErrormessage(error as string);
    }
  }

  async function editPromptHandler (data: any) {
    try {
      const response = await API.patch(`/prompt/${editPrompt?._id}`, data, {
        withCredentials: true,
      });
      setPrompt(response.data.prompt);
      setEditPrompt(null);
    } catch (error) {
      setErrormessage(error as string);
    }
  }

  const setUser = useUser((state) => state.setUser);

  async function onDeleteComment(commentId: string) {
    try {
      const response = await API.delete(`/comment/${commentId}`, {
        withCredentials: true,
      });
      setPrompt((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (error) {
      setErrormessage(error as string);
    }
  }

  async function onDeletePrompt(promptId: string) {
    try {
      const response = await API.delete(`/prompt/${promptId}`, {
        withCredentials: true,
      });
      // setUser(null); //  BIG NO, delete prompt in user, not user directly
      router.push("/");
      
    } catch (error) {
      setErrormessage(error as string);
    }
  }



  useEffect(() => {
    getPrompt();  
  }, []);

  return (
    <div>
      <PromptCard data={prompt} editPrompt={editPrompt} editPromptHandler={editPromptHandler} deletePrompt={onDeletePrompt} />
      <CommentCard
        id={id}
        rhfRegister={register}
        rhfHandleSubmit={handleSubmit(createComment)}
        errors={errors}
        comments={prompt.comments}
        editCommentHandler={editCommentHandler}
        editComment = {editComment}
        deleteComment={onDeleteComment}
        />
    </div>
  );
};

export default PromptPage;
