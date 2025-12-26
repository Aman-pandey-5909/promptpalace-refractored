import { z } from "zod";

const tagsSchema = z.preprocess(
    (value) => {
        if (typeof value === "string") {
            return value.split(",");
        }
        return value;
    },
    z.array(z.string(), "At least three tags are required").min(3)
)

export const promptSchema = z.object({
    title: z.string().min(3),
    prompt: z.string().min(3),
    description: z.string().min(3),
    tags: tagsSchema,
    image: z.string().optional(),
});

export type Prompt = z.infer<typeof promptSchema>;