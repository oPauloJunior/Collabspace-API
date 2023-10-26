import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class ListAllFriendsByUserUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "User ID é inválido!",
      });
    }

    const listAllFriendsByUser1 =
      await this.friendRepository.listAllFriendsByUser(usrId);

    const listAllFriendsByUser2 =
      await this.friendRepository.listAllFriendsByUser(id);

    const friends = listAllFriendsByUser2.map((friend) => {
      return {
        id: friend.id,
        user1: {
          id: friend.users_friends_user_id_1Tousers.id,
          name: friend.users_friends_user_id_1Tousers.name,
          avatarUrl: friend.users_friends_user_id_1Tousers.avatar_url,
        },
        user2: {
          id: friend.users_friends_user_id_2Tousers.id,
          name: friend.users_friends_user_id_2Tousers.name,
          avatarUrl: friend.users_friends_user_id_2Tousers.avatar_url,
        },
        createdAt: friend.created_at,
      };
    });

    let mutualFriends;

    if (usrId !== id) {
      mutualFriends = listAllFriendsByUser1.reduce((acc, friend1) => {
        listAllFriendsByUser2.forEach((friend2) => {
          if (
            friend1.users_friends_user_id_1Tousers.id ===
            friend2.users_friends_user_id_1Tousers.id
          )
            acc++;
        });

        return acc++;
      }, 0);
    }

    return new AppResponse({
      message: "Amizades listadas com sucesso!",
      data: {
        friends,
        mutualFriends,
      },
    });
  }
}

export { ListAllFriendsByUserUseCase };
