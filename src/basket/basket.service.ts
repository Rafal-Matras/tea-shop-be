import { Inject, Injectable } from '@nestjs/common';

import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

import { ProductService } from '../product/product.service';

import { Basket } from './entities/basket.entity';
import { User } from '../user/entities/user.entity';
import { BasketInterface } from '../types';

@Injectable()
export class BasketService {

  constructor(
    @Inject(ProductService) private productService: ProductService
  ) {
  }

  async create(createBasket: CreateBasketDto, user: User): Promise<Basket> {
    const { count, packSize, productId } = createBasket;
    const product = await this.productService.findOne(productId);

    const basket = new Basket();
    basket.count = count;
    basket.packSize = packSize;

    await basket.save();

    basket.product = product;
    basket.user = user;

    await basket.save();

    return basket;
  }

  async findMany(id: string): Promise<BasketInterface[]> {
    return await Basket
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.product', 'product')
      .where('basket.userId = :id', { id })
      .getMany();

  }

  async findOne(id: string): Promise<BasketInterface> {
    return await Basket.findOne({
      relations: ['product'],
      where: {
        id
      }
    });

  }

  async update(id: string, updateBasket: UpdateBasketDto): Promise<BasketInterface> {
    const { count, packSize } = updateBasket;

    const basket = await Basket.findOne({
      where: {
        id
      }
    });

    basket.count = count ?? basket.count;
    basket.packSize = packSize ?? basket.packSize;

    await basket.save();

    return basket;
  }

  async removeMany(id: string): Promise<boolean> {
    await Basket
      .createQueryBuilder('basket')
      .delete()
      .where('basket.userId = :id', { id })
      .execute();

    return true;
  }

  async remove(id: string): Promise<boolean> {
    const basket = await Basket.findOne({
      where: {
        id
      }
    });

    await basket.remove();

    return true;
  }

  async basketFullPrice(id: string): Promise<number> {
    const items = await this.findMany(id);

    const price = (await Promise.all(items
      .map(async item => item.product.price * item.count * item.packSize)))
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(2);

    return +price
  }

}
