import { inject, injectable } from "tsyringe";

import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateUser } from "@modules/users/dto/users";
import { IUsersRepositories } from "@modules/users/iRepositories/iUsersRepositories";
import { UuidProvider } from "@shared/container/providers/uuidProvider/implementation/UuidProvider";
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
    private uuidProvider: UuidProvider
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido! ",
      });
    }

    const listUserById = await this.userRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        message: "Usuario nao encontrado!",
      });
    }

    await this.userRepository.updadte({
      id,
      name,
      telephone: telephoneFormat(telephone),
      birthDate,
    });

    return new AppResponse({
      message: "Usuario atualizado com sucesso!",
    });
  }
}

export { UpdateUserUseCase };
