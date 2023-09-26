import { prisma } from "@libs/prismaClient";

import {
  ICreateUser,
  IUpdateUser,
  IUpdateUserAvatar,
  IUpdateUserCover,
  IUser,
} from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";

class UserRepository implements IUsersRepositories {
  create({
    id,
    name,
    email,
    telephone,
    birthDate,
    password,
  }: ICreateUser): Promise<IUser> {
    return prisma.users.create({
      data: {
        id,
        name,
        email,
        telephone,
        birth_date: birthDate,
        password,
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

  async update({ id, name, telephone, birthDate }: IUpdateUser): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        name,
        telephone,
        birth_date: birthDate,
      },
    });
  }

  async updateAvatar({ id, avatarUrl }: IUpdateUserAvatar): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        avatar_url: avatarUrl,
      },
    });
  }

  async updateCover({ id, coverUrl }: IUpdateUserCover): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        cover_url: coverUrl,
      },
    });
  }

  async inactivate(id: string, status: boolean): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: { active: status },
    });
  }
}

export { UserRepository };
