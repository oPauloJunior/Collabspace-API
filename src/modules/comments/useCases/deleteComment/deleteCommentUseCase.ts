import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentsRepositories } from "@modules/comments/IRepositories/ICommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
  postId: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: UuidProvider
  ) {}

  async execute({ usrId, postId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "CommentID é invalido!",
      });
    }

    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "PostID é invalido!",
      });
    }

    const listPostById = await this.postRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }

    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    if (usrId !== listCommentById.user_id && usrId !== listPostById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.commentRepository.delete(id);

    return new AppResponse({
      message: "Comentário deletado com sucesso!",
    });
  }
}

export { DeleteCommentUseCase };
