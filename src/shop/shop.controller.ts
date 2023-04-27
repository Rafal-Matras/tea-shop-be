import { Controller, Get, Param } from '@nestjs/common';

import { OneProductResponse, ProductListResponse } from '../types';

import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {
  }

  @Get('/')
  findAll(): Promise<ProductListResponse> {
    return this.shopService.findAll();
  }

  @Get('/na_prezent')
  findAllProductsForGift(): Promise<ProductListResponse> {
    return this.shopService.findAllProductsForGift();
  }

  @Get('/promocje')
  findAllProductsPromo(): Promise<ProductListResponse> {
    return this.shopService.findAllProductsPromo();
  }

  @Get('/:category/:type?')
  findAllProductsTypes(
    @Param('category') category: string,
    @Param('type') type: string,
  ): Promise<ProductListResponse> {
    return this.shopService.findAllProductsTypes(category,type);
  }

  @Get('/product/:id')
  findOne(
    @Param('id') id: string
  ): Promise<OneProductResponse> {
    return this.shopService.findOne(id);
  }

}