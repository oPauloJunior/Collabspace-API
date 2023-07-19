import { inject, injectable } from "tsyringe";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
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

    await this.postRepository.delete(id);

    return new AppResponse({
      message: "Post deletado com sucesso!",
    });
  }
}

export { DeletePostUseCase };
