import { ICreateUser, IUpdateUser, IUser } from "@modules/users/dto/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUser>;
  listByEmail(email: string): Promise<IUser | null>;
  listById(id: string): Promise<IUser | null>;
  updadte(data: IUpdateUser): Promise<void>;
}

export { IUsersRepositories };
