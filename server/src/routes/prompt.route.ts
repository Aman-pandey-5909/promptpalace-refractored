import { Router } from "express";
import { validate } from "../middleware/validate";
import { promptSchema } from "../schemas/Prompt.schema";

const routes = Router();

import { getPromptsController, createPromptController, editPromptController, deletePromptController, toggleLikeController, getPromptByIdController } from "../controllers/prompt.controller";

routes.get("/prompts", getPromptsController);
routes.post("/prompt", validate(promptSchema), createPromptController);
routes.patch("/prompt/:id", validate(promptSchema), editPromptController);
routes.delete("/prompt/:id", deletePromptController);
routes.patch("/prompt/:id/like", toggleLikeController);
routes.get("/prompt/:id", getPromptByIdController);
// routes.patch("/prompt/:id/dislike", toggleDislikeController);


export default routes;