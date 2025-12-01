import { sandboxController } from "../controllers/sandbox.controller";

import { Router } from "express";

const routes = Router();

routes.post("/sandbox", sandboxController);

export default routes;