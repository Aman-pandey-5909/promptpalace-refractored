import { z } from "zod";

export const promptSchema = z.object({
    title: z.string().min(3),
    prompt: z.string().min(3),
    description: z.string().min(3),
    tags: z.array(z.string()),
    image: z.string().optional(),
});

export type Prompt = z.infer<typeof promptSchema>;