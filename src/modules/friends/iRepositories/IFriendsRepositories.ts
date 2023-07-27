import {
  ICreateFriend,
  IFriend,
  IListAllFriendsByUser,
  IListAllRequestsByUser,
  IUpdateActionStatus,
} from "../dtos/friends";

interface IFriendsRepositories {
  create(data: ICreateFriend): Promise<IFriend>;
  listById(id: string): Promise<IFriend | null>;
  listAlreadyExists(userId1: string, userId2: string): Promise<IFriend | null>;
  listAllFriendsByUser(id: string): Promise<IListAllFriendsByUser[]>;
  listAllRequestsByUser(id: string): Promise<IListAllRequestsByUser[]>;
  updateActionStatus(data: IUpdateActionStatus): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IFriendsRepositories };
