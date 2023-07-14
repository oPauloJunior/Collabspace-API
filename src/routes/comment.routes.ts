import { CreateCommentController } from "@modules/comments/useCases/createCommentController";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const commentRoutes = Router();

commentRoutes.use(authentication);

commentRoutes.post("/:id", new CreateCommentController().handle);

export { commentRoutes };
