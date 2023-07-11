import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/iUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";
import { PostsRepository } from "@modules/posts/repositories/PostsRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostsRepository
);
