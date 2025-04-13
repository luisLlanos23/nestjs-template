import * as moment from "moment";
import * as Bcrypt from "bcrypt";
import * as JWT from "jwt-simple";

type TDataToken = {
  sub: number;
  name: string;
};

export class CryptoUtilities {
  /**
   * Generate token for user
   * @param data Object contain user id and user name
   * @param secret secret for encrypt
   */
  public tokenGenerator(data: TDataToken, secret: string): string {
    const payload = {
      ...data,
      iat: moment().unix(),
      exp: moment().add(14, "days"),
    };
    return JWT.encode(payload, secret);
  }
  /**
   * Encrypt password
   * @param password password for encrypt
   */
  public async encrypt(password: string): Promise<string> {
    return await Bcrypt.hash(password, 15);
  }
  /**
   * Decrypt token
   * @param token auth token for decrypt
   * @param secret secret for decrypt
   */
  public decrypt(token: string, secret: string) {
    return JWT.decode(token, secret);
  }
  /**
   * Check if token is still valid
   * @param token auth token for decrypt
   * @param secret secret for decrypt
   */
  public isTokenLive(token: string, secret: string) {
    const payload = JWT.decode(token, secret);
    const unixDate = new Date(payload.exp).getTime();
    return unixDate >= moment().unix();
  }

  public isCorrectPassword(password: string, hash: string) {
    return Bcrypt.compare(password, hash);
  }
}
