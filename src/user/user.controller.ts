import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserResponse,
  FindAllUserResponse,
  FindOneUserResponse,
  RemoveUserResponse,
  UpdateUserResponse
} from '../types';

import { UserService } from './user.service';

@Controller('/user')
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
  findAll(): Promise<FindAllUserResponse> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(
    @Param('id') id: string
  ): Promise<FindOneUserResponse> {
    return this.userService.findOne(id);
  }

  @Get('/is-in-database/:email')
  findOneByEmail(
    @Param('email') email: string
  ): Promise<boolean> {
    return this.userService.findOneByEmail(email);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto
  ): Promise<UpdateUserResponse> {
    return this.userService.update(id, updateUser);
  }

  @Delete('/:id')
  remove(
    @Param('id') id: string
  ): Promise<RemoveUserResponse> {
    return this.userService.remove(id);
  }
}
