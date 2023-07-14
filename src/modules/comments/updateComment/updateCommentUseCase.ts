import { inject, injectable } from "tsyringe";

import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IRequestUpdateComment } from "../dtos/comments";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";
import { ICommentRepositories } from "../IRepositories/ICommentsRepositories";

interface IRequest extends IRequestUpdateComment {
  id: string;
  usrId: string;
}

@injectable()
class UpdateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ id, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listCommentById = await this.commentRepository.listByID(id);

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
