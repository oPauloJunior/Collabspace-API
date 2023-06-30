import bcryptjs from "bcryptjs";

interface IBcrypt {
  salt: string;
  hash: string;
}

async function encryptPassword(password: string): Promise<IBcrypt> {
  const salt = await bcryptjs.genSalt(10);

  const hash = await bcryptjs.hash(password, salt);

  return { salt, hash };
}

export { encryptPassword };
