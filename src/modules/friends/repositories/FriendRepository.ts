import { prisma } from "@libs/prismaClient";
import { ICreateFriend, IFriend, IUpdateActionStatus } from "../dtos/friends";
import { IFriendsRepositories } from "../iRepositories/IFriendsRepositories";

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

  listAlreadyExists(userId1: string, userId2: string): Promise<IFriend | null> {
    return prisma.friends.findFirst({
      where: {
        user_id_1: userId1,
        user_id_2: userId2,
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
}

export { FriendRepository };
