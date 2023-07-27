interface IFriend {
  id: string;
  user_id_1: string;
  user_id_2: string;
  action_id_1: number;
  action_id_2: number | null;
  created_at: Date;
}

interface ICreateFriend {
  id: string;
  userId1: string;
  userId2: string;
}

interface IUpdateActionStatus {
  id: string;
  actionId1?: number;
  actionId2?: number | null;
}

interface User {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface IListAllFriendsByUser {
  id: string;
  users_friends_user_id_1Tousers: User;
  users_friends_user_id_2Tousers: User;
  created_at: Date;
}

interface IListAllRequestsByUser {
  id: string;
  users_friends_user_id_1Tousers: User;
  created_at: Date;
}

export {
  IFriend,
  ICreateFriend,
  IUpdateActionStatus,
  IListAllFriendsByUser,
  IListAllRequestsByUser,
};
