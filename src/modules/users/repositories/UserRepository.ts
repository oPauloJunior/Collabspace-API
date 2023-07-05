import { prisma } from "@libs/prismaClient";

import { ICreateUser, IUpdateUser, IUser } from "@modules/users/dto/users";
import { IUsersRepositories } from "@modules/users/iRepositories/iUsersRepositories";

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

  listByEmail(email: string): Promise<IUser | null> {
    return prisma.users.findFirst({
      where: { email: { equals: email } },
    });
  }

  listById(id: string): Promise<IUser | null> {
    return prisma.users.findFirst({
      where: { id },
    });
  }

  async updadte({
    id,
    name,
    telephone,
    birthDate,
  }: IUpdateUser): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        name,
        telephone,
        birth_date: birthDate,
      },
    });
  }
}

export { UserRepository };
