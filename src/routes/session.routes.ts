import { Router } from "express";

import { CreateUserSessionController } from "@modules/sessions/useCases/createUserSession/createUserSessionController";

const sessionRoutes = Router();

sessionRoutes.post("/", new CreateUserSessionController().handle);

export { sessionRoutes };
