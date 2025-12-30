"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/schemas/user";
import CreatePrompt from "@/components/user/CreatePrompt";
import { useForm, SubmitHandler } from "react-hook-form";
import API from "@/lib/api";
import PreviewPrompt from "@/components/prompt/PreviewPrompt";
import { useRouter } from "next/navigation";

interface DashboardProps {
  user: User;
}

const DashboardPage = ({ user }: DashboardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [userPrompts, setUserPrompts] = useState<any>([]);

  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await API.post("/prompt", data, {
        withCredentials: true,
      });
      setUserPrompts([...userPrompts, response.data.prompt]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserPrompts(user.posts);
    console.log(user.posts);
  }, []);

  return (
    <React.Fragment>
      <div>Email: {user?.email}</div>
      <div>Username: {user?.username}</div>
      <div>Role: {user?.role}</div>
      <div>
        Posts:{" "}
        {userPrompts.length > 0
          ? userPrompts.map((post: any) => (
              <PreviewPrompt key={post._id} {...post} onReadMore={() => router.push(`/prompt/${post._id}`)} />
            ))
          : "No posts"}
      </div>
      <div>premiumUntil: {user?.premiumUntil?.toLocaleDateString()}</div>
      <div>reputation: {user?.reputation}</div>
      <div>createdAt: {user?.createdAt?.toLocaleDateString()}</div>
      <CreatePrompt
        rhfRegister={register}
        rhfHandleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
    </React.Fragment>
  );
};

export default DashboardPage;
