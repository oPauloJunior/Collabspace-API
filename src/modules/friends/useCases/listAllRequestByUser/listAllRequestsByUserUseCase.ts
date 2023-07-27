import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
}

@injectable()
class ListAllRequestsByUserUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories
  ) {}

  async execute({ usrId }: IRequest): Promise<AppResponse> {
    const listAllRequestsByUser =
      await this.friendRepository.listAllRequestsByUser(usrId);

    const requests = listAllRequestsByUser.map((friend) => {
      return {
        id: friend.id,
        user1: {
          id: friend.users_friends_user_id_1Tousers.id,
          name: friend.users_friends_user_id_1Tousers.name,
          avatarUrl: friend.users_friends_user_id_1Tousers.avatar_url,
        },
        createdAt: friend.created_at,
      };
    });

    return new AppResponse({
      message: "Amizades listadas com sucesso!",
      data: {
        requests,
      },
    });
  }
}

export { ListAllRequestsByUserUseCase };
