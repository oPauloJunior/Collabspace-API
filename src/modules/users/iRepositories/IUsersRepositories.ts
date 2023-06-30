import { ICreateUser, IUser } from "@modules/users/dito/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUser>;
  listByemail(email: string): Promise<IUser | null>;
}

export { IUsersRepositories };
