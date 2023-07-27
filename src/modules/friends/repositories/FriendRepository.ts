import { prisma } from "@libs/prismaClient";
import {
  ICreateFriend,
  IFriend,
  IListAllFriendsByUser,
  IListAllRequestsByUser,
  IUpdateActionStatus,
} from "../dtos/friends";
import { IFriendsRepositories } from "../iRepositories/IFriendsRepositories";
import { EnumFriendActions } from "src/enums/friendActions";

class FriendRepository implements IFriendsRepositories {
  create({ id, userId1, userId2 }: ICreateFriend): Promise<IFriend> {
    return prisma.friends.create({
      data: {
        id,
        user_id_1: userId1,
        user_id_2: userId2,
      },
    });
  }

  listById(id: string): Promise<IFriend | null> {
    return prisma.friends.findFirst({
      where: { id },
    });
  }

  listAlreadyExists(userId1: string, userId2: string): Promise<IFriend | null> {
    return prisma.friends.findFirst({
      where: {
        user_id_1: userId1,
        user_id_2: userId2,
      },
    });
  }

  listAllFriendsByUser(id: string): Promise<IListAllFriendsByUser[]> {
    return prisma.friends.findMany({
      where: {
        OR: [
          {
            user_id_1: id,
          },
          {
            user_id_2: id,
          },
        ],
        AND: [
          {
            action_id_1: EnumFriendActions.requested,
          },
          {
            action_id_2: EnumFriendActions.accepted,
          },
        ],
      },
      select: {
        id: true,
        users_friends_user_id_1Tousers: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        users_friends_user_id_2Tousers: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        created_at: true,
      },
    });
  }

  listAllRequestsByUser(id: string): Promise<IListAllRequestsByUser[]> {
    return prisma.friends.findMany({
      where: {
        user_id_2: id,
        AND: [
          {
            action_id_1: EnumFriendActions.requested,
          },
          {
            action_id_2: null,
          },
        ],
      },
      select: {
        id: true,
        users_friends_user_id_1Tousers: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        created_at: true,
      },
    });
  }

  async updateActionStatus({
    actionId1,
    actionId2,
    id,
  }: IUpdateActionStatus): Promise<void> {
    await prisma.friends.update({
      where: { id },
      data: {
        action_id_1: actionId1,
        action_id_2: actionId2,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.friends.delete({
      where: { id },
    });
  }
}

export { FriendRepository };
