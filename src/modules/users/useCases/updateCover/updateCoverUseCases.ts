import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateUserCover } from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateUserCover {
  usrId: string;
}

@injectable()
class UpdateCoverUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories
  ) {}

  async execute({ usrId, coverUrl }: IRequest): Promise<AppResponse> {
    if (coverUrl)
      if (
        !coverUrl.match(
          /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/gi
        )
      ) {
        throw new AppError({
          message: "URL inválida!",
        });
      }

    await this.userRepository.updateCover({
      id: usrId,
      coverUrl,
    });

    return new AppResponse({
      message: "Cover atualizado com sucesso!",
    });
  }
}

export { UpdateCoverUseCase };
