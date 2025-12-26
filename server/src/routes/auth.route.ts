import { Router } from "express";
import { validate } from "../middleware/validate";
import { sessionVerify } from "../middleware/sessionverify";
import { userSchema } from "../schemas/User";

const routes = Router()

import { registerController, verifyEmailController, loginController, logoutController, getuserController, getOtherUserController } from "../controllers/auth.controller";

routes.post('/register', validate(userSchema), registerController)
routes.post('/login', loginController)
routes.post('/verify/:token', verifyEmailController)
routes.post('/logout', logoutController)
routes.get('/user', sessionVerify, getuserController)
routes.get('/user/:id', sessionVerify, getOtherUserController)

export default routes