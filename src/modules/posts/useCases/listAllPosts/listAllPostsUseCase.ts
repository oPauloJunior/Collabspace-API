import { AppResponse } from "@helpers/responseParser";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
  page: string;
  limit: string;
}

@injectable()
class ListAllPostsUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostsRepositories
  ) {}

  async excute({ page, limit }: IRequest): Promise<AppResponse> {
    const listAll = await this.postRepository.listAll(
      Number(page) || 0,
      Number(limit) || 10
    );

    const total = await this.postRepository.count();

    const posts = listAll.map((post) => {
      const comments = post.comments.map((comment) => {
        const reactions = comment.reactions.map((reaction) => {
          const { users } = reaction;

          return {
            id: reaction.id,
            entityType: reaction.entity_type,
            reactedAt: reaction.reacted_at,
            user: {
              id: users.id,
              name: users.name,
              email: users.email,
              avatarUrl: users.avatar_url,
            },
          };
        });

        const { users } = comment;

        return {
          id: comment.id,
          content: comment.content,
          commentedAt: comment.commented_at,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
            avatarUrl: users.avatar_url,
          },
          reactions,
        };
      });

      const reactions = post.reactions.map((reaction) => {
        const { users } = reaction;

        return {
          id: reaction.id,
          entityType: reaction.entity_type,
          reactedAt: reaction.reacted_at,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
            avatarUrl: users.avatar_url,
          },
        };
      });

      const { users } = post;

      return {
        id: post.id,
        content: post.content,
        tags: post.tags,
        visibility: post.visibility,
        publishedAt: post.published_at,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatar_url,
        },
        comments,
        reactions,
      };
    });

    return new AppResponse({
      message: "Posts listados com sucesso!",
      data: {
        total,
        posts,
      },
    });
  }
}

export { ListAllPostsUseCase };
