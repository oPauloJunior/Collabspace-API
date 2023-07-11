import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./session.routes";
import { postRoutes } from "./post.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);
router.use("/posts", postRoutes);

export { router };
