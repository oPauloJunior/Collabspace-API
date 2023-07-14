import { IComment, ICreateComment } from "../dtos/comments";

interface ICommetntRepositories {
  create(comment: ICreateComment): Promise<IComment>;
}

export { ICommetntRepositories };
