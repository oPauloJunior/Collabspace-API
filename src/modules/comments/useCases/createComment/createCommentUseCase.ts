import { inject, injectable } from "tsyringe";
import { ICommentRepositories } from "../../IRepositories/ICommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IRequestCreateComment } from "../../dtos/comments";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest extends IRequestCreateComment {
  postId: string;
  usrId: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ postId, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "Id é invalido!",
      });
    }

    const listPostById = await this.postRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado!",
      });
    }

    const createComment = await this.commentRepository.create({
      id: this.uuidProvider.createUUID(),
      postId,
      userId: usrId,
      content,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Comentário criado com sucesso!",
      data: {
        id: createComment.id,
        postId: createComment.post_id,
        userId: createComment.user_id,
        content: createComment.content,
      },
    });
  }
}

export { CreateCommentUseCase };
