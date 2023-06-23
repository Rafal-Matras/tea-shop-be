import { Controller, Get, Post, Body, Param, Delete, Inject, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CreateOrderResponse,
  GetManyOrderResponse,
  GetOneOrderResponse,
  RemoveOrderResponse,
  UpdateOrderResponse
} from '../types';

import { UserObj } from '../common/decorators/userobj.decorator';
import { RoleGuard } from '../common/guards/roleGuard';
import { UseRole } from '../common/decorators/userole.decorator';

import { OrderService } from './order.service';
import { User } from '../user/entities/user.entity';

@Controller('/api/order')
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
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @UserObj() user: User
  ): Promise<GetManyOrderResponse> {
    return this.orderService.findAll(user.id);
  }

  @Get('/one/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(
    @Param('id') id: string,
    ): Promise <GetOneOrderResponse> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @UseRole('Admin')
  update(
    @Param('id') id: string,
    @Body() updateOrder: UpdateOrderDto,
    ): Promise<UpdateOrderResponse> {
    return this.orderService.update(id, updateOrder);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @UseRole('Admin')
  remove(
    @Param('id') id: string,
    ): Promise<RemoveOrderResponse> {
    return this.orderService.remove(id);
  }
}
