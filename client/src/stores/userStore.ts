import { create } from 'zustand'
import { User } from '@/schemas/user'
import { PromptCardProps } from '@/components/prompt/PromptCard'

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

type optionsStore = {
    editPrompt: PromptCardProps["data"] | null,
    setEditPrompt: (editPrompt: PromptCardProps["data"] | null) => void,
    editComment: { comment: string; commentId: string } | null,
    setEditComment: (editComment: { comment: string; commentId: string } | null) => void,
}

export const useOptions = create<optionsStore>((set) => ({
    editPrompt: null,
    setEditPrompt: (editPrompt: PromptCardProps["data"] | null) => set({ editPrompt }),
    editComment: null,
    setEditComment: (editComment: { comment: string; commentId: string } | null) => set({ editComment }),
}))