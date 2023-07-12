import { prisma } from "@libs/prismaClient";
import { ICreatePost, IListAllPosts, IPost, IUpdatePost } from "../dtos/posts";
import { IPostsRepositories } from "../iRepositories/iPostsRepositories";

class PostsRepository implements IPostsRepositories {
  create({
    id,
    userId,
    content,
    tags,
    visibility,
  }: ICreatePost): Promise<IPost> {
    return prisma.posts.create({
      data: {
        id,
        user_id: userId,
        content,
        tags,
        visibility,
      },
    });
  }

  listById(id: string): Promise<IPost | null> {
    return prisma.posts.findFirst({
      where: { id },
    });
  }

  listAll(page: number, limit: number): Promise<IListAllPosts[]> {
    return prisma.posts.findMany({
      skip: page * limit,
      take: limit,
      select: {
        id: true,
        content: true,
        tags: true,
        visibility: true,
        published_at: true,
        users: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
    });
  }

  async update({ id, content, tags, visibility }: IUpdatePost): Promise<void> {
    await prisma.posts.update({
      where: { id },
      data: {
        content,
        tags,
        visibility,
      },
    });
  }
}
export { PostsRepository };
