import { ICreatePost, IListAllPosts, IPost, IUpdatePost } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
  listById(id: string): Promise<IPost | null>;
  listAll(page: number, limit: number): Promise<IListAllPosts[]>;
  count(): Promise<number>;
  update(data: IUpdatePost): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IPostsRepositories };
