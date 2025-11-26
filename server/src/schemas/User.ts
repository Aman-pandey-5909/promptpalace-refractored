import { z } from "zod";

export const userSchema = z.object({
  username: z.string().optional(),
  email: z.email(),
});

export type UserType = z.infer<typeof userSchema>
