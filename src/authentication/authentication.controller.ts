import { Body, Post } from '@nestjs/common';
import { ControllerAuth } from 'src/utils/decorators/controllers.decorator';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { LoginDto } from 'src/authentication/authentication.dto';
import { CreateUserDto } from 'src/api/users/dto/user.dto';

@ControllerAuth({ name:''})
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}
  /**
   * @openapi
   * /auth/register:
   *  post:
   *    tags: [Authentication Endpoints]
   *    description: Register user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createUserDto'
   *    responses:
   *      200:
   *        description: Login successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const result = await this.authService.register(userData);
    return { data: result }
  }
  /**
   * @openapi
   * /auth/login:
   *  post:
   *    tags: [Authentication Endpoints]
   *    description: Login user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      200:
   *        description: Login successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const result = await this.authService.login(loginData);
    return { data: result }
  }
}
