import { Injectable } from '@nestjs/common';

import { OneProduct, ProductsList } from '../types';

import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ShopService {

  async findAll(): Promise<ProductsList[]> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .getMany();
  }

  async findAllProductsTypes(category: string, type: string): Promise<ProductsList[]> {
    if (!type) type = '';
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.category = :category', { category })
      .andWhere('product.type LIKE :type', { type: `%${type}%` })
      .getMany();
  }

  async findAllProductsForGift():Promise<ProductsList[]> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    console.log('gift-------');
    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.forGift = 1')
      .getMany();
  }

  async findAllProductsPromo():Promise<ProductsList[]> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.promo is not null')
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

}