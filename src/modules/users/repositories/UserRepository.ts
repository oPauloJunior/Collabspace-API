import { prisma } from "src/libs/prismaClient";

import { ICreateUser, IUser } from "../dito/users";
import { IUsersRepositories } from "../iRepositories/IUsersRepositories";

class UserRepository implements IUsersRepositories {
  create({
    id,
    name,
    email,
    telephone,
    birthDate,
    password,
    avatarUrl,
  }: ICreateUser): Promise<IUser> {
    return prisma.users.create({
      data: {
        id,
        name,
        email,
        telephone,
        birth_date: birthDate,
        password,
        avatar_url: avatarUrl,
      },
    });
  }
}

export { UserRepository };