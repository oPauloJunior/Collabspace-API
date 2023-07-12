import { inject, injectable } from "tsyringe";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
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
    private uuidProvider: UuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
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

    await this.postRepository.delete(id);

    return new AppResponse({
      message: "Post deletado com sucesso!",
    });
  }
}

export { DeletePostUseCase };
