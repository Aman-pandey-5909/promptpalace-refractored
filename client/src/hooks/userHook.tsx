'use client'
import { useUser } from "@/stores/userStore"
import React, { PropsWithChildren } from "react"
import { useEffect } from "react"
import API from "@/lib/api"
import { normalizeUser } from "@/schemas/user"

const UserHook = ({children}: PropsWithChildren) => {
    const user = useUser((state: any) => state.user)
    const setUser = useUser((state: any) => state.setUser)

    async function checkUser() {
        if (user) return
        try {
            const response = await API.get("/user", { withCredentials: true });
            console.log(response);
            setUser(normalizeUser(response.data.user));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkUser();
    }, [])
  return (
    <>{children}</>
  )
}

export default UserHook