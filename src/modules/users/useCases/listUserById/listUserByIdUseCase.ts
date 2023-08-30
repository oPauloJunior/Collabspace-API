import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class ListUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido",
      });
    }

    const listUserById = await this.userRepository.listById(id);

    const user = {
      id: listUserById?.id,
      name: listUserById?.name,
      email: listUserById?.email,
      telephone: listUserById?.telephone,
      birthDate: listUserById?.birth_date,
      avatarUrl: listUserById?.avatar_url,
      createdAt: listUserById?.created_at,
    };

    return new AppResponse({
      message: "success",
      data: {
        user,
      },
    });
  }
}

export { ListUserByIdUseCase };
