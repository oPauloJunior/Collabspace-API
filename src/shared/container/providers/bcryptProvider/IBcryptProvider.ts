interface IBcrypt {
  salt: string;
  hash: string;
}

interface IBcryptProvider {
  encryptPassword(password: string): Promise<IBcrypt>;
}

export { IBcryptProvider, IBcrypt };
