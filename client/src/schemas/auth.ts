import {z} from "zod"

export const loginSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_]{3,16}$/, "Invalid username").min(3).max(16),
})

export type Login = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string().trim().regex(/^[a-zA-Z0-9_]{3,16}$/, "Invalid username").min(3).max(16).lowercase(),
    email: z.email().lowercase(),
})

export type Register = z.infer<typeof registerSchema>