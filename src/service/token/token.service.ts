import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

export type TokenData = {
  data: {
    id: number;
    email: string;
    isAdmin: boolean;
  }
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService {
  TOKEN_SECRET: string;
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
  ) {
    this.TOKEN_SECRET = this.config.secretToken();
  }

  public async createToken(dataToken, time): Promise<string> {
    const token = await this.jwtService.sign(
      { data: dataToken },
      {
        expiresIn: time,
        privateKey: this.TOKEN_SECRET,
      },
    );
    return token;
  }

  public async verifyToken(dataToken): Promise<TokenData> {
    try {
      const tokenDecoded = await this.jwtService.verify(dataToken, {
        secret: this.TOKEN_SECRET,
      });
      return tokenDecoded;
    } catch (error) {
      throw error;
    }
  }

  public async createTokenKey(payload: { id: number, email: string, isAdmin: boolean }, time: string): Promise<string> {
    const token = await this.jwtService.sign(
      { data: payload },
      {
      privateKey: this.config.secretToken(),
      expiresIn: time,
      },
    );
    const verify = await this.verifyTokenKey(token);
    if (!verify) throw new Error('Token not valid');
    return token;
  }

  public async verifyTokenKey(token: string): Promise<TokenData> {
    try {
      const tokenDecoded = await this.jwtService.verify(token, {
        secret: this.config.secretToken()
      });
      return tokenDecoded;
    } catch (error) {
      throw error;
    }
  }
}
