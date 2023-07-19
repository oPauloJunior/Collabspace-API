import bcryptjs from "bcryptjs";

import { IBcryptProvider, IBcrypt } from "../IBcryptProvider";

class BcryptProvider implements IBcryptProvider {
  async encryptPassword(password: string): Promise<IBcrypt> {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    return { salt, hash };
  }

  async checkPassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return bcryptjs.compare(password, encryptedPassword);
  }
}

export { BcryptProvider };
