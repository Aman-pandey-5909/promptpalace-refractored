"use client";
import API from "@/lib/api";
import { useEffect, useState } from "react";
import PreviewPrompt from "@/components/prompt/PreviewPrompt";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [res, setRes] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const getPrompts = async () => {
    try {
      const response = await API.get("/prompts", { withCredentials: true });
      setRes(response.data.prompts);
      console.log(response);
      setError("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Internal Server Error"
      );
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div>
        {error ? (
          <span>{error}</span>
        ) : (
          <div>
            {res.length > 0 &&
              res.map((prompt: any) => (
                <div key={prompt.id}>
                  <PreviewPrompt
                    {...prompt}
                    onReadMore={() => router.push(`/prompt/${prompt.id}`)}
                  />{" "}
                </div>
              ))}
          </div>
        )}
        
      </div>
    </>
  );
};

export default HomePage;
