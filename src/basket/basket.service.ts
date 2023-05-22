import { Inject, Injectable } from '@nestjs/common';

import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

import { ProductService } from '../product/product.service';

import { Basket } from './entities/basket.entity';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class BasketService {

  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(MailService) private mailService: MailService
  ) {
  }

  async create(createBasket: CreateBasketDto, user: User): Promise<{ id: string }> {
    const { count, packSize, productId } = createBasket;
    const product = await this.productService.findOne(productId);

    const basket = new Basket();

    basket.count = count;
    basket.packSize = packSize;

    await basket.save();

    basket.product = product;
    basket.user = user;

    await basket.save();

    return { id: basket.id };
  }

  async findMany(id: string): Promise<Basket[]> {
    return await Basket
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.product', 'product')
      .where('basket.userId = :id', { id })
      .getMany();

  }

  async findOne(id: string): Promise<Basket> {
    return await Basket.findOne({
      relations: ['product'],
      where: {
        id
      }
    });

  }

  async update(updateBasket: UpdateBasketDto): Promise<boolean> {
    const { id, count, packSize } = updateBasket;

    const basket = await Basket.findOne({
      where: {
        id
      }
    });

    basket.count = count ?? basket.count;
    basket.packSize = packSize ?? basket.packSize;

    await basket.save();

    return true;
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
      .map(async item => (item.product.price * 100 * item.count * item.packSize) / 100)))
      .reduce((prev, curr) => prev + curr, 0);

    return price;
  }

}