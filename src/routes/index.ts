import { Router } from "express";

import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./session.routes";
import { postRoutes } from "./post.routes";
import { commentRoutes } from "./comment.routes";
import { reactionRoutes } from "./reaction.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/reactions", reactionRoutes);

export { router };
