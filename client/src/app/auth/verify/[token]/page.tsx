'use client'

import VerifyPage from "@/pages/auth/VerifyPage";
import { useParams } from "next/navigation";
const Verify = () => {
  const { token }: any = useParams();
  console.log("params: ", token);
  return (
    <VerifyPage token={token}/>
  )
}

export default Verify