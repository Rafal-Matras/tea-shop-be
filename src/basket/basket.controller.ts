import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  BasketFullPriceResponse,
  CreateBasketResponse, DeleteBasketResponse, DeleteManyBasketResponse,
  FindManyBasketResponse,
  FindOneBasketResponse,
  UpdateBasketResponse
} from '../types/basket';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

import { BasketService } from './basket.service';

import { UserObj } from '../common/decorators/userobj.decorator';
import { User } from '../user/entities/user.entity';

@Controller('/basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private basketService: BasketService) {
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createBasket: CreateBasketDto,
    @UserObj() user: User
  ): Promise<CreateBasketResponse> {
    return this.basketService.create(createBasket, user);
  }


  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  findMany(
    @UserObj() user: User
  ): Promise<FindManyBasketResponse> {
    return this.basketService.findMany(user.id);
  }

  @Get('/full-price')
  @UseGuards(AuthGuard('jwt'))
  basketFullPrice(
    @UserObj() user: User
  ): Promise<BasketFullPriceResponse> {
    return this.basketService.basketFullPrice(user.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(
    @Param('id') id: string
  ): Promise<FindOneBasketResponse> {
    return this.basketService.findOne(id);
  }

  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Body() updateBasket: UpdateBasketDto
  ): Promise<UpdateBasketResponse> {
    return this.basketService.update(updateBasket);
  }

  @Delete('/all')
  @UseGuards(AuthGuard('jwt'))
  removeMany(
    @UserObj() user: User
  ): Promise<DeleteManyBasketResponse> {
    return this.basketService.removeMany(user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id') id: string
  ): Promise<DeleteBasketResponse> {
    return this.basketService.remove(id);
  }

}
