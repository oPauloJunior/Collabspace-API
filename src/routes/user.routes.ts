import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

export { userRoutes };
