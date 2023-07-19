import { inject, injectable } from "tsyringe";

import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateUser } from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { AppError } from "@helpers/errorsHandler";
import { telephoneFormat } from "@utils/formatData";

interface IRequest extends IRequestUpdateUser {
  id: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listUserById = await this.userRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        message: "Usuário não encontrado!",
      });
    }

    await this.userRepository.update({
      id,
      name,
      telephone: telephoneFormat(telephone),
      birthDate,
    });

    return new AppResponse({
      message: "Usuário atualizado com sucesso!",
    });
  }
}

export { UpdateUserUseCase };
