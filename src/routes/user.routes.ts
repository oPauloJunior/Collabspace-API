import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/updateUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.put("/:id", new UpdateUserController().handle);

export { userRoutes };
