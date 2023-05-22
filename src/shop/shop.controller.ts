import { Controller, Get, Param } from '@nestjs/common';

import {
  GetPriceProductResponse,
  OneProductResponse,
  ProductListOnHomepageResponse,
  ProductListResponse,
  SearchListResponse
} from '../types';

import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {
  }

  @Get('/home-page/:maxOnPage')
  findAllProductsOnHomePage(
    @Param('maxOnPage') maxOnPage:number
  ): Promise<ProductListOnHomepageResponse> {
    return this.shopService.findAllProductsOnHomePage(maxOnPage);
  }

  @Get('/all/:current/:maxOnPage')
  findAll(
    @Param('current') current:number,
    @Param('maxOnPage') maxOnPage:number,
  ): Promise<ProductListResponse> {
    return this.shopService.findAll(current,maxOnPage);
  }

  @Get('/na_prezent/:current/:maxOnPage')
  findAllProductsForGift(
    @Param('current') current:number,
    @Param('maxOnPage') maxOnPage:number,
  ): Promise<ProductListResponse> {
    return this.shopService.findAllProductsForGift(current,maxOnPage);
  }

  @Get('/promocje/:current/:maxOnPage')
  findAllProductsPromo(
    @Param('current') current:number,
  @Param('maxOnPage') maxOnPage:number,
  ): Promise<ProductListResponse> {
    return this.shopService.findAllProductsPromo(current,maxOnPage);
  }

  @Get('/new/:current/:maxOnPage')
  findAllProductsNew(
    @Param('current') current:number,
  @Param('maxOnPage') maxOnPage:number,
  ): Promise<ProductListResponse> {
    return this.shopService.findAllProductsNew(current,maxOnPage);
  }

  @Get('/search/:name')
  searchProducts(
    @Param('name') name:string
  ):Promise<SearchListResponse>{
    return  this .shopService.searchProducts(name);
  }

  @Get('/product/:id')
  findOne(
    @Param('id') id: string
  ): Promise<OneProductResponse> {
    return this.shopService.findOne(id);
  }

  @Get('/price/:id')
  getPrice(
    @Param('id') id: string
  ): Promise<GetPriceProductResponse> {
    return this.shopService.getPrice(id);
  }

  @Get('/:category/:current/:maxOnPage/:type?')
  findAllProductsTypes(
    @Param('category') category: string,
    @Param('current') current:number,
    @Param('maxOnPage') maxOnPage:number,
    @Param('type') type: string,
  ): Promise<ProductListResponse> {
    return this.shopService.findAllProductsTypes(category,current,maxOnPage,type);
  }

}