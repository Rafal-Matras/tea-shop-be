import { Controller, Get, Post, Body, Param, Delete, Inject, UseGuards, Put } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CreateOrderResponse,
  GetManyOrderResponse,
  GetOneOrderResponse,
  RemoveOrderResponse,
  UpdateOrderResponse
} from '../types';

import { OrderService } from './order.service';

import { UserObj } from '../common/decorators/userobj.decorator';

import { User } from '../user/entities/user.entity';

@Controller('/order')
export class OrderController {
  constructor(
    @Inject(OrderService) private orderService: OrderService
  ) {
  }

  @Post('/')
  create(
    @Body() createOrder: CreateOrderDto,
  ): Promise<CreateOrderResponse> {
    return this.orderService.create(createOrder);
  }

  @Get('/all')
  findAll(
    @UserObj() user: User
  ): Promise<GetManyOrderResponse> {
    return this.orderService.findAll(user.id);
  }

  @Get('/one/:id')
  findOne(
    @Param('id') id: string,
    ): Promise <GetOneOrderResponse> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrder: UpdateOrderDto,
    ): Promise<UpdateOrderResponse> {
    return this.orderService.update(id, updateOrder);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    ): Promise<RemoveOrderResponse> {
    return this.orderService.remove(id);
  }
}
