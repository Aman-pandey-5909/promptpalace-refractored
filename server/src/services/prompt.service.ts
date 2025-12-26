import Prompts from "../models/Prompts";
import { maskify } from "./slugGen";

export const getPrompts = async () => {
    const prompts = await Prompts.find();
    const returnVal = prompts.map((prompt)=>{
        return {
            id: prompt._id,
            authorName: prompt.authorName,
            titleSlug: prompt.titleMasked,
            descriptionSlug: prompt.descriptionMasked,
            likes: prompt.likes,
            tags: prompt.tags
        }
    })
    return returnVal;
};

export const getPromptById = async (id: string) => {
    const prompt = await Prompts.findById(id).populate("comments");
    return prompt;
};

export const createPrompt = async (data: any) => {
    data.titleMasked = maskify(data.title);
    data.descriptionMasked = maskify(data.description);
    const prompt = await Prompts.create(data);
    return prompt;
};
 
export const updatePrompt = async (id: string, data: any) => {
    if(data.title) {
        data.titleMasked = maskify(data.title);
    }

    if(data.description) {
        data.descriptionMasked = maskify(data.description);
    }
    
    const prompt = await Prompts.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return prompt;
};

export const deletePrompt = async (id: string) => {
    const prompt = await Prompts.findByIdAndDelete(id);
    return prompt;
};