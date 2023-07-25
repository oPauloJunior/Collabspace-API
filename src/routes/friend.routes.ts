import { AcceptRequestController } from "@modules/friends/useCases/acceptRequest/acceptRequestController";
import { CreateFriendController } from "@modules/friends/useCases/createFriend/createFriendController";
import { RecuseRequestController } from "@modules/friends/useCases/recusedRequest/recuseRequestController";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const friendRoutes = Router();

friendRoutes.use(authentication);

friendRoutes.post("/:targetId", new CreateFriendController().handle);
friendRoutes.patch("/cancelRequest/:id", new CreateFriendController().handle);
friendRoutes.patch("/acceptRequest/:id", new AcceptRequestController().handle);
friendRoutes.patch("/recuseRequest/:id", new RecuseRequestController().handle);

export { friendRoutes };
