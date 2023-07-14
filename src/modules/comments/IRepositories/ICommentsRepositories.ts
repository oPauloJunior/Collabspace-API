import { IComment, ICreateComment, IUpdateComment } from "../dtos/comments";

interface ICommentRepositories {
  create(comment: ICreateComment): Promise<IComment>;
  listByID(id: string): Promise<IComment | null>;
  update(data: IUpdateComment): Promise<void>;
}

export { ICommentRepositories };
