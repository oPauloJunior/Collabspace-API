interface IBcrypt {
  salt: string;
  hash: string;
}

interface IBcryptProvider {
  encryptPassword(password: string): Promise<IBcrypt>;
  checkPassword(password: string, encryptedPassword: string): Promise<boolean>;
}

export { IBcryptProvider, IBcrypt };
