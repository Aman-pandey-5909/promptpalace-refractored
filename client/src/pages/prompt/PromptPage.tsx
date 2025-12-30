"use client";
import PromptCard from "@/components/prompt/PromptCard";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import { PromptCardProps } from "@/components/prompt/PromptCard";
import CommentCard from "@/components/prompt/CommentCard";
import { useForm, SubmitHandler } from "react-hook-form";

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
    title: "",
    prompt: "",
    description: "",
    tags: [],
    likes: 0,
    comments: [],
    createdAt: "",
  };

  const [prompt, setPrompt] = useState({ ...emptyPrompt } as PromptCardProps["data"]);
  const [editcommentval, setEditcommentVal] = useState(""); /* replace with an object of type @CommentType, instead of using creat Comment's input, change it to inplace edit i.e. when clicked on edit btn, change the comment <p> to <input> and handle edit func there */
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
        comments: [...prev.comments, response.data.comment],
      }));
    } catch (error) {
      setErrormessage(error as string);
      // console.log(error);
    }
  };

  async function getPrompt() {
    try {
      const response = await API.get(`/prompt/${id}`, {
        withCredentials: true,
      });
      setPrompt(response.data.prompt);
      // setComments(response.data.prompt.comments)
      console.log(response.data.prompt);
    } catch (error) {
      setErrormessage(error as string);
      // console.log(error);
    }
  }

  // async function getComments() {
  //   try {
  //     const response = await API.get(`/comments/${id}`, {
  //       withCredentials: true,
  //     });
  //     setComments(response.data.comments);
  //   } catch (error) {
  //     setErrormessage(error as string);
  //     // console.log(error);
  //   }
  // }

  function editComments(comment: string) {
    setEditcommentVal(comment);
  }

  useEffect(() => {
    getPrompt();  
    // getComments();
  }, []);

  return (
    <div>
      <PromptCard data={prompt} />
      <CommentCard
        id={id}
        rhfRegister={register}
        rhfHandleSubmit={handleSubmit(createComment)}
        errors={errors}
        comments={prompt.comments}
        onEditComment={editComments}
        commentVal={editcommentval}
      />
    </div>
  );
};

export default PromptPage;
