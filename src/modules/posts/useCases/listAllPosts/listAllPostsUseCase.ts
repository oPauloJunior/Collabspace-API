import { AppResponse } from "@helpers/responseParser";
import { IPostsRepositories } from "@modules/posts/iRepositories/iPostsRepositories";
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

  async execute({ page, limit }: IRequest): Promise<AppResponse> {
    const listAll = await this.postRepository.listAll(
      Number(page) || 0,
      Number(limit) || 10
    );

    const posts = listAll.map((post) => ({
      id: post.id,
      content: post.content,
      tags: post.tags,
      visibility: post.visibility,
      publishedAt: post.published_at,
      user: {
        id: post.users.id,
        name: post.users.name,
        avatarUrl: post.users.avatar_url,
      },
    }));

    return new AppResponse({
      message: "Posts listados com sucesso!",
      data: {
        posts,
      },
    });
  }
}

export { ListAllPostsUseCase };
