import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateProductResponse,
  FindAllProductResponse,
  FindByProductNameResponse,
  FindOneProductResponse,
  RemoveProductResponse,
  UpdateProductResponse
} from '../types';

import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() newProduct: CreateProductDto
  ): Promise<CreateProductResponse> {
    return this.productService.create(newProduct);
  }

  @Get('/')
  findAll(): Promise<FindAllProductResponse> {
    return this.productService.findAll();
  }

  @Get('/name/:name')
  findByName(
    @Param('name') name:string
  ):Promise<FindByProductNameResponse>{
    return this.productService.findByName(name)
  }

  @Get('/:id')
  findOne(
    @Param('id') id: string
  ): Promise<FindOneProductResponse> {
    return this.productService.findOne(id);
  }


  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<UpdateProductResponse> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')
  remove(
    @Param('id') id: string
  ): Promise<RemoveProductResponse> {
    return this.productService.remove(id);
  }
}
