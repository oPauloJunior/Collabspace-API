import { Router } from "express";
import { authentication } from "src/middlewares/authentication";
import { CreateCommentController } from "@modules/comments/useCases/createComment/createCommentController";
import { UpdateCommentController } from "@modules/comments/useCases/updateComment/updateCommentController";
import { DeleteCommentController } from "@modules/comments/useCases/deleteComment/deleteCommentController";

const commentRoutes = Router();

commentRoutes.use(authentication);

commentRoutes.post("/:id", new CreateCommentController().handle);
commentRoutes.put("/:id", new UpdateCommentController().handle);
commentRoutes.delete("/:id/:postId", new DeleteCommentController().handle);

export { commentRoutes };
