import { Router } from "express";
import { validate } from "../middleware/validate";
import { userSchema } from "../schemas/User";

const routes = Router()

import { registerController, verifyEmailController, loginController, logoutController } from "../controllers/auth.controller";

routes.post('/register', validate(userSchema), registerController)
routes.post('/login', loginController)
routes.post('/verify/:token', verifyEmailController)
routes.post('/logout', logoutController)

export default routes