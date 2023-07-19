import { inject, injectable } from "tsyringe";
import { IRequestCreatePost } from "@modules/posts/dtos/posts";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest extends IRequestCreatePost {
  userId: string;
}

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    userId,
    content,
    tags,
    visibility,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(userId)) {
      throw new AppError({
        message: "User ID é inválido!",
      });
    }

    const createPost = await this.postRepository.create({
      id: this.uuidProvider.createUUID(),
      userId,
      content,
      tags,
      visibility,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Post criado com sucesso!",
      data: {
        id: createPost.id,
        userId: createPost.user_id,
        tags: createPost.tags,
        visibility: createPost.visibility,
      },
    });
  }
}

export { CreatePostUseCase };
