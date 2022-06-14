import jsonwebtoken from 'jsonwebtoken';

import { SECRET_KEY, TOKEN_DURATION } from '../config/environment';

export class JWT {
  public encrypt(payload: Record<string, unknown>) {
    const token = jsonwebtoken.sign({ payload }, SECRET_KEY, {
      expiresIn: TOKEN_DURATION,
      algorithm: 'HS256',
    });
    return token;
  }

  public decrypt(token: string): Record<string, unknown> {
    let tokenData;
    try {
      tokenData = jsonwebtoken.verify(token, SECRET_KEY);
      if (typeof tokenData === 'string') {
        tokenData = JSON.parse(tokenData);
        tokenData = tokenData;
      }
    } catch (error) {
      tokenData = { error: 'Invalid token' };
    }
    return tokenData;
  }
}

const jwt = new JWT();

export default jwt;
