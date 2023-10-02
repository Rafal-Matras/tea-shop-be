import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserResponse,
  FindAllUserResponse,
  FindOneUserResponse, ForgotPasswordResponse,
  RemoveUserResponse, UpdatePwdUserResponse,
  UpdateUserResponse,
} from '../types';

import { UserService } from './user.service';
import { UpdatePwdUserDto } from './dto/update-pwd-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../common/decorators/userobj.decorator';
import { User } from './entities/user.entity';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/')
  create(
    @Body() createUser: CreateUserDto
  ): Promise<CreateUserResponse> {
    return this.userService.create(createUser);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<FindAllUserResponse> {
    return this.userService.findAll();
  }

  @Get('/is-in-database/:email')
  findOneByEmail(
    @Param('email') email: string
  ): Promise<FindOneUserResponse> {
    return this.userService.findOneByEmail(email);
  }

  @Get('/forgot-password/:email')
  forgotPassword(
    @Param('email') email: string
  ):Promise<ForgotPasswordResponse> {
    return this.userService.forgotPassword(email)
  }

  @Get('/:id')
  findOne(
    @Param('id') id: string
  ): Promise<FindOneUserResponse> {
    return this.userService.findOne(id);
  }

  @Put('/change-password/:id')
  updatePwd(
    @Param('id') id:string,
    @Body() newPwd: UpdatePwdUserDto,
  ): Promise<UpdatePwdUserResponse>{
    return this.userService.updatePwd(id,newPwd)
  }

  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  update(
    @UserObj() user: User,
    @Body() updateUser: UpdateUserDto
  ): Promise<UpdateUserResponse> {
    return this.userService.update(user.id, updateUser);
  }

  @Delete('/:id')
  remove(
    @Param('id') id: string
  ): Promise<RemoveUserResponse> {
    return this.userService.remove(id);
  }
}
