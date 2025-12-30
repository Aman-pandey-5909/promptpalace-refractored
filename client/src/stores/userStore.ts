import { create } from 'zustand'
import { User } from '@/schemas/user'

type userStore = {
    user: User | null,
    setUser: (user: User | null) => void,
    clearUser: () => void
}



export const useUser = create<userStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    clearUser: () => set({ user: null }),
}))

export const usePrompt = create((set) => ({}))