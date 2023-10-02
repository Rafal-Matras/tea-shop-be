import { Injectable } from '@nestjs/common';

import { OneProduct, ProductListResponse, ProductsList, SearchListResponse } from '../types';

import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ShopService {


  async findAll(current: number, maxOnPage: number): Promise<ProductListResponse> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    const count = await Product.count();
    const products = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .take(maxOnPage)
      .skip(current * maxOnPage)
      .getMany();

    const totalPages = Math.ceil(count / maxOnPage);

    return {
      products,
      count,
      totalPages
    };
  }

  async searchProducts(name: string): Promise<SearchListResponse> {
    const product = ['product.id', 'product.category', 'product.type', 'product.name'];
    return await Product
      .createQueryBuilder('product')
      .select(product)
      .where('product.name LIKE :name', { name: `%${name}%` })
      .getMany();

  }

  async findAllProductsTypes(category: string, current: number, maxOnPage: number, type: string): Promise<ProductListResponse> {
    if (!type) type = '';
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    const count = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.category = :category', { category })
      .andWhere('product.type LIKE :type', { type: `%${type}%` })
      .getCount();

    const totalPages = Math.ceil(count / maxOnPage);

    const products = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.category = :category', { category })
      .andWhere('product.type LIKE :type', { type: `%${type}%` })
      .take(maxOnPage)
      .skip(current * maxOnPage)
      .getMany();

    return {
      products,
      count,
      totalPages
    };
  }

  async findAllProductsForGift(current: number, maxOnPage: number): Promise<ProductListResponse> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    const count = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.forGift = 1')
      .getCount();

    const totalPages = Math.ceil(count / maxOnPage);

    const products = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.forGift = 1')
      .take(maxOnPage)
      .skip(current * maxOnPage)
      .getMany();

    return {
      products,
      count,
      totalPages
    };
  }

  async findAllProductsPromo(current: number, maxOnPage: number): Promise<ProductListResponse> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    const count = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.promo > 0')
      .getCount();

    const totalPages = Math.ceil(count / maxOnPage);

    const products = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.promo > 0')
      .take(maxOnPage)
      .skip(current * maxOnPage)
      .getMany();

    return {
      products,
      count,
      totalPages
    };
  }

  async findAllProductsNew(current: number, maxOnPage: number): Promise<ProductListResponse> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    const count = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.new = 1')
      .getCount();

    const totalPages = Math.ceil(count / maxOnPage);

    const products = await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.new = 1')
      .take(maxOnPage)
      .skip(current * maxOnPage)
      .getMany();

    return {
      products,
      count,
      totalPages
    };
  }

  async findAllProductsOnHomePage(maxOnPage: number): Promise<ProductsList[]> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];

    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.onHomePage = 1')
      .take(maxOnPage)
      .getMany();
  }

  async findOne(id: string): Promise<OneProduct> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.description', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.state', 'product.promo', 'product.ingredients', 'product.countryOrigin', 'product.amountBrew', 'product.temperatureBrew', 'product.timeBrew', 'product.numberBrews', 'product.storageMethod', 'product.coffeeSpecies', 'product.howToBrew', 'product.capacity', 'product.size'];

    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.id = :id', { id })
      .getOne();
  }

  async getPrice(id: string): Promise<number> {
    const product = await Product
      .createQueryBuilder('product')
      .select(['product.price'])
      .where('product.id = :id', { id })
      .getOne();

    return product.price;
  }

}