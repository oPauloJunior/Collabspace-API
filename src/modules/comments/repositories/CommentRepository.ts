import { prisma } from "@libs/prismaClient";
import { ICommentsRepositories } from "../iRepositories/ICommentsRepositories";
import { ICreateComment, IComment, IUpdateComment } from "../dtos/comments";

class CommentRepository implements ICommentsRepositories {
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

  listById(id: string): Promise<IComment | null> {
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

  async delete(id: string): Promise<void> {
    await prisma.comments.delete({
      where: { id },
    });
  }
}

export { CommentRepository };
