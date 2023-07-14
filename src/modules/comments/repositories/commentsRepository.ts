import { prisma } from "@libs/prismaClient";
import { ICommetntRepositories } from "../IRepositories/ICommentsRepositories";
import { IComment, ICreateComment, IUpdateComment } from "../dtos/comments";

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

  listByID(id: string): Promise<IComment | null> {
    return prisma.comments.findFirst({
      where: { id },
    });
  }

  async update({ id, content }: IUpdateComment): Promise<void> {
    await prisma.comments.update({
      where: { id },
      data: {
        content,
      },
    });
  }
}

export { CommentRepository };
