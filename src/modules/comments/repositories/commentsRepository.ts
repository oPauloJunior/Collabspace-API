import { prisma } from "@libs/prismaClient";
import { ICommetntRepositories } from "../IRepositories/ICommentsRepositories";
import { IComment, ICreateComment } from "../dtos/comments";

class CommentRepository implements ICommetntRepositories {
  create({ id, postId, userId, content }: ICreateComment): Promise<IComment> {
    return prisma.comments.create({
      data: {
        id,
        post_id: postId,
        user_id: userId,
        content,
      },
    });
  }
}

export { CommentRepository };
