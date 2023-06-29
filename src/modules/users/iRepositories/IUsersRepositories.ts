import { ICreateUser, IUser } from "../dito/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUser>;
}

export { IUsersRepositories };
