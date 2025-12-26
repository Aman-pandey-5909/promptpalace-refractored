import { asyncHandler } from "../utils/asyncHandler";
import {
  getPrompts,
  createPrompt,
  getPromptById,
  updatePrompt,
  deletePrompt,
} from "../services/prompt.service";

// get all prompts
export const getPromptsController = asyncHandler(async (req, res) => {
  const prompts = await getPrompts();
  return res.status(200).json({ message: "Prompts fetched successfully", prompts });
});

// create prompt
export const createPromptController = asyncHandler(async (req, res) => {
  req.body.authorName = req.username;
  const prompt = await createPrompt(req.body);
  return res.status(201).json({ message: "Prompt created successfully", prompt: prompt });
});

export const getPromptByIdController = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const prompt = await getPromptById(req.params.id);
  return res.status(200).json({ message: "Prompt fetched successfully", prompt });
});

// edit prompt (patch)
export const editPromptController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const prompt = await updatePrompt(id, data);
  return res.status(200).json({ message: "Prompt updated successfully", prompt });
});

// delete prompt
export const deletePromptController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const prompt = await deletePrompt(id);
  return res.status(200).json({ message: "Prompt deleted successfully" });
});

// For like, implementan array of users who have liked it instead of this, so that each user can like only once and prevent likes spam via bots and shi
export const toggleLikeController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userid = req.userid;
  const alreadyLiked = await getPromptById(id);
  if (alreadyLiked!.likes.includes(userid)) {
    const prompt = await updatePrompt(id, { $pull: { likes: userid } });
    return res.status(200).json({
      message: "Prompt unliked successfully",
      likes: prompt?.likes.length,
    });
  }
  const prompt = await updatePrompt(id, {
    $addToSet: { likes: userid },
  });
  return res.status(200).json({
    message: "Prompt liked successfully",
    likes: prompt?.likes.length,
  });
});
