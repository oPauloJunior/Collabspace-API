import { Router } from "express";

import { CreateReactionController } from "@modules/reactions/useCases/createReaction/createReactionController";

import { authentication } from "src/middlewares/authentication";
import { DeleteReactionController } from "@modules/reactions/useCases/deleteReaction/deleteReactionController";

const reactionRoutes = Router();

reactionRoutes.use(authentication);

reactionRoutes.post("/", new CreateReactionController().handle);
reactionRoutes.delete("/:id", new DeleteReactionController().handle);

export { reactionRoutes };
