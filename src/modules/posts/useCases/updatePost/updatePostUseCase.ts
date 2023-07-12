import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreatePost } from "@modules/posts/dtos/posts";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestCreatePost {
  usrId: string;
  id: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: UuidProvider
  ) {}

  async execute({
    usrId,
    id,
    content,
    tags,
    visibility,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é invalido!",
      });
    }

    const listById = await this.postRepository.listById(id);

    if (!listById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }

    if (usrId !== listById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não autorizada!",
      });
    }

    await this.postRepository.update({
      id,
      content,
      tags,
      visibility,
    });

    return new AppResponse({
      message: "Post atualizado com sucesso!",
    });
  }
}

export { UpdatePostUseCase };
