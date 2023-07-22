import { ICreateFriend, IFriend, IUpdateActionStatus } from "../dtos/friends";

interface IFriendsRepositories {
  create(data: ICreateFriend): Promise<IFriend>;
  listAlreadyExists(userId1: string, userId2: string): Promise<IFriend | null>;
  updateActionStatus(data: IUpdateActionStatus): Promise<void>;
}

export { IFriendsRepositories };
