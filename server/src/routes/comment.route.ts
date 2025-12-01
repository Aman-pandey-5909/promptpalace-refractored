import { Router } from "express";
const routes = Router();

import { createCommentController, getCommentsController, updateCommentController, deleteCommentController } from "../controllers/comment.controller";

routes.post("/comment/:id", createCommentController);
routes.get("/comments/:id", getCommentsController);
routes.patch("/comment/:id", updateCommentController);
routes.delete("/comment/:id", deleteCommentController);

export default routes;