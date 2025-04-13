import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IsString, IsNotEmpty, validate } from 'class-validator';
import { TokenService } from 'src/service/token/token.service';

export class HeadersTokenDto {
  @IsString()
  @IsNotEmpty()
  authorization: string;
}

@Injectable()
export class AuthVerifyTokenMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  async use(req: Request, res: Response, next) {
    try {
      const headers: any = req.headers;
      const headerData: HeadersTokenDto = new HeadersTokenDto();
      headerData.authorization = headers.authorization;
      const errors = await validate(headerData);
      if (errors.length > 0) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json(new ForbiddenException(errors));
      }

      await this.tokenService.verifyTokenKey(headers.authorization);
      next();
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(err);
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error', error: err });
    }
  }
}
