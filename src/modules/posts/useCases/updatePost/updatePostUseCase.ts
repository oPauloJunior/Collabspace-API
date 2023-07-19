import { inject, injectable } from "tsyringe";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IRequestUpdatePost } from "@modules/posts/dtos/posts";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest extends IRequestUpdatePost {
  usrId: string;
  id: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
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
        message: "ID é inválido!",
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
        message: "Operação não permitida!",
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
