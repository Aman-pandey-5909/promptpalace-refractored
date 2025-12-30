import { useUser } from "@/stores/userStore"

export const getUserData = () => {
    const user = useUser((state: any) => state.user)
    console.log(user);
}