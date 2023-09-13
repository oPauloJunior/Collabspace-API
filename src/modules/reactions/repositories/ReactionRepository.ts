import { prisma } from "@libs/prismaClient";
import { ICreateReaction, IReaction } from "../dtos/reactions";
import { IReactionsRepositories } from "../iRepositories/IReactionsRepositories";

class ReactionRepository implements IReactionsRepositories {
  create({
    id,
    userId,
    postId,
    commentId,
    entityType,
  }: ICreateReaction): Promise<IReaction> {
    return prisma.reactions.create({
      data: {
        id,
        user_id: userId,
        post_id: postId || null,
        comment_id: commentId || null,
        entity_type: entityType,
      },
      select: {
        id: true,
        user_id: true,
        post_id: true,
        comment_id: true,
        entity_type: true,
        reacted_at: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
          },
        },
      },
    });
  }

  listById(id: string): Promise<IReaction | null> {
    return prisma.reactions.findFirst({
      where: { id },
    });
  }

  countReactionUserPost(userId: string, postId: string): Promise<number> {
    return prisma.reactions.count({
      where: { user_id: userId, post_id: postId },
    });
  }

  countReactionUserComment(userId: string, commentId: string): Promise<number> {
    return prisma.reactions.count({
      where: { user_id: userId, comment_id: commentId },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.reactions.delete({
      where: { id },
    });
  }
}

export { ReactionRepository };
