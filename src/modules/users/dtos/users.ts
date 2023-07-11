interface IUser {
  id: string;
  name: string;
  email: string;
  telephone: string | null;
  birth_date: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
  active: boolean;
}

interface IRequestCreateUser {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  telephone: string | null;
  birthDate: string;
}

interface ICreateUser {
  id: string;
  name: string;
  email: string;
  telephone?: string | null;
  birthDate: string;
  password: string;
  avatarUrl?: string;
}

interface IRequestUpdateUser {
  name: string;
  telephone: string;
  birthDate: string;
}

interface IUpdateUser {
  id: string;
  name?: string;
  telephone?: string | null;
  birthDate?: string;
}

export {
  IUser,
  ICreateUser,
  IRequestCreateUser,
  IRequestUpdateUser,
  IUpdateUser,
};
