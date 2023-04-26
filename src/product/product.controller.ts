import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateProductResponse,
  FindAllProductResponse,
  FindOneProductResponse,
  RemoveProductResponse,
  UpdateProductResponse
} from '../types';

@Controller('/admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post('/')
  create(
    @Body() newProduct: CreateProductDto
  ): Promise<CreateProductResponse> {
    return this.productService.create(newProduct);
  }

  @Get('/')
  findAll(): Promise<FindAllProductResponse> {
    return this.productService.findAll();
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
