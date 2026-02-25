import express from "express"

const authRouter = express.Router()

import { RegisterController } from "../../controllers/auth/register.controller.js";
import SignInController from "../../controllers/auth/signin.controller.js";
import { SignOutController } from "../../controllers/auth/signout.controller.js";


authRouter.post("/register", RegisterController);
authRouter.post("/signin", SignInController);
authRouter.get("/signout", SignOutController);
export {authRouter}