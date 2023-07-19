import { ICreateReaction, IReaction } from "../dtos/reactions";

interface IReactionsRepositories {
  create(reaction: ICreateReaction): Promise<IReaction>;
  listById(id: string): Promise<IReaction | null>;
  countReactionUserPost(userId: string, postId: string): Promise<number>;
  countReactionUserComment(userId: string, commentId: string): Promise<number>;
  delete(id: string): Promise<void>;
}

export { IReactionsRepositories };
