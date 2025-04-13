import { Post, Get, Put, Delete, Body, Param, Headers, Patch } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ControllerApi } from 'src/utils/decorators/controllers.decorator';
import { UsersEntity } from 'src/api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from 'src/api/users/dto/user.dto';

@ControllerApi({ name: 'users' })
export class UsersController extends BaseController<
  UsersEntity,
  CreateUserDto,
  UpdateUserDto
  > {
  constructor(protected UsersService: UsersService) {
    super(UsersService);
  }
  /**
   * @openapi
   * /api/users:
   *  post:
   *    tags: [Users Endpoints]
   *    description: Create a new user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createUserDto'
   *    responses:
   *      200:
   *        description: Create user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/createUserResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const result = await this.UsersService.create(user);
    return { data: result }
  }
  /**
   * @openapi
   * /api/users:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Get all users
   *    responses:
   *      200:
   *        description: Get all users successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/getAllUsersResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Get()
  async getAllUsers(){
    const result = await this.UsersService.getAll();
    return { data: result }
  }
  /**
   * @openapi
   * /api/users/{id}:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Get user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    responses:
   *      200:
   *        description: Get user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/getUserResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const result = await this.UsersService.getById(Number(id));
    return { data: result }
  }
  /**
   * @openapi
   * /api/users/{id}:
   *  put:
   *    tags: [Users Endpoints]
   *    description: Update user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    requestBody:
   *     content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/updateUserDto'
   *    responses:
   *      200:
   *        description: Update user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/combinedModifiedAndRequestResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.UsersService.update(Number(id), user);
  }
  /**
   * @openapi
   * /api/users/{id}:
   *  delete:
   *    tags: [Users Endpoints]
   *    description: Delete user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    responses:
   *      200:
   *        description: Delete user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/combinedModifiedAndRequestResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.UsersService.removeUser(Number(id), token);
  }
  /**
   * @openapi
   * /api/users/{id}:
   *  patch:
   *    tags: [Users Endpoints]
   *    description: Enable user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    responses:
   *      200:
   *        description: Enable user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/combinedModifiedAndRequestResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Patch(':id')
  async enableUser(@Param('id') id: string, @Headers('Authorization') token: string) {
    return await this.UsersService.userEnable(Number(id), token);
  }
  /**
   * @openapi
   * /api/users/{id}/change-password:
   *  put:
   *    tags: [Users Endpoints]
   *    description: Change password user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/changePasswordDto'
   *    responses:
   *      200:
   *        description: Change password user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/combinedModifiedAndRequestResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  @Put(':id/change-password')
  async changePassword(@Param('id') id: string, @Body() passwords: ChangePasswordDto, @Headers('Authorization') token: string) {
    return await this.UsersService.changePassword(passwords, token, Number(id));
  }
}