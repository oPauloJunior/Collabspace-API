import "./providers";
import { container } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { PostRepository } from "@modules/posts/repositories/PostRepository";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";
import { CommentRepository } from "@modules/comments/repositories/CommentRepository";
import { IReactionsRepositories } from "@modules/reactions/iRepositories/IReactionsRepositories";
import { ReactionRepository } from "@modules/reactions/repositories/ReactionRepository";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { FriendRepository } from "@modules/friends/repositories/FriendRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostRepository
);

container.registerSingleton<ICommentsRepositories>(
  "CommentRepository",
  CommentRepository
);

container.registerSingleton<IReactionsRepositories>(
  "ReactionRepository",
  ReactionRepository
);

container.registerSingleton<IFriendsRepositories>(
  "FriendRepository",
  FriendRepository
);
