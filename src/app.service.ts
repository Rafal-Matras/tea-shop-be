import { Injectable } from '@nestjs/common';
import { ProductsList } from './types';
import { Product } from './product/entities/product.entity';

@Injectable()
export class AppService {
  async getHomepageProducts(): Promise<ProductsList[]> {
    const selectedProducts = ['product.id', 'product.category', 'product.type', 'product.name', 'product.price', 'product.image', 'product.unit', 'product.numberOfUnits', 'product.new', 'product.promo'];
    return await Product
      .createQueryBuilder('product')
      .select(selectedProducts)
      .where('product.onHomePage = :onHomePage', { onHomePage: 1 })
      .getMany();


  }
}
