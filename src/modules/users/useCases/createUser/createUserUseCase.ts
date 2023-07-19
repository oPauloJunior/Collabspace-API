import { inject, injectable } from "tsyringe";

import { IRequestCreateUser } from "@modules/users/dtos/users";
import { telephoneFormat } from "@utils/formatData";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider,
    @inject("BcryptProvider")
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser): Promise<AppResponse> {
    if (password !== confirmPassword) {
      throw new AppError({
        message: "As senhas não coincidem!",
      });
    }

    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      throw new AppError({
        message: "Senha fraca!",
      });
    }

    if (email !== confirmEmail) {
      throw new AppError({
        message: "Os e-mails não coincidem!",
      });
    }

    const listUserByEmail = await this.userRepository.listByEmail(email);

    if (listUserByEmail) {
      throw new AppError({
        message: "Usuário já cadastrado!",
      });
    }

    const passwordHash = await this.bcryptProvider.encryptPassword(password);

    const createUser = await this.userRepository.create({
      id: this.uuidProvider.createUUID(),
      name,
      email,
      telephone: telephoneFormat(telephone),
      birthDate,
      password: passwordHash.hash,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Usuário criado com sucesso!",
      data: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        telephone: createUser.telephone,
        birthDate: createUser.birth_date,
      },
    });
  }
}

export { CreateUserUseCase };
