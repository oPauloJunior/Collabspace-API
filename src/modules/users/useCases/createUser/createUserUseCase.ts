import { v4 } from "uuid";

import { encryptPassword } from "@utils/bcrypt";
import { IRequestCreateUser } from "@modules/users/dito/users";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { telephoneFormat } from "@utils/formatData";

class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser): Promise<any> {
    if (password !== confirmPassword) {
      return { message: "As senhas nao coindicem!" };
    }

    console.log(password);

    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      return { message: "Senha fraca!" };
    }

    if (email !== confirmEmail) {
      return { message: "As senhas nao coindicem!" };
    }

    const listUserByEmail = await this.userRepository.listByemail(email);

    if (listUserByEmail) {
      return { message: "Usuaio ja cadastrado" };
    }

    const passwordHash = await encryptPassword(password);

    const craateUser = await this.userRepository.create({
      id: v4(),
      name,
      email,
      telephone: telephoneFormat(telephone),
      birthDate,
      password: passwordHash.hash,
    });

    return { craateUser };
  }
}

export { CreateUserUseCase };
