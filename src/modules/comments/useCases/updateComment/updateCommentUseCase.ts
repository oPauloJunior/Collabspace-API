import { inject, injectable } from "tsyringe";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IRequestUpdateComment } from "@modules/comments/dtos/comments";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest extends IRequestUpdateComment {
  id: string;
  usrId: string;
}

@injectable()
class UpdateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ id, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    if (usrId !== listCommentById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.commentRepository.update({
      id,
      content,
    });

    return new AppResponse({
      message: "Comentário editado com sucesso!",
    });
  }
}

export { UpdateCommentUseCase };
