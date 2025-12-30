"use client";

import { verifyHandler } from "@/services/auth/authHandler";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/stores/userStore";

const VerifyPage = ({ token }: any) => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const setUser = useUser((s) => s.setUser);

  const router = useRouter();

  useEffect(() => {
    async function callVerifyHandler() {
      try {
        const res = await verifyHandler(
          token,
          setError,
          setVerified,
          setMessage
        );
        setUser(res);
        router.push("/");
      } catch (error: Error | any) {
        // setError(error.response.data.message);
        console.log(error);
      }
    }

    callVerifyHandler();
  }, []);

  return (
    <>
      {verified && <p>{message}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default VerifyPage;
