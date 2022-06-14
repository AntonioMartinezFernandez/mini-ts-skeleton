import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../config/environment';

export class Encryption {
  public async encrypt(password: string): Promise<string> {
    const gensalt = parseInt(SALT_ROUNDS);
    const salt = await bcrypt.genSalt(gensalt);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  }

  public async match(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
  }
}

const encryption = new Encryption();

export default encryption;
