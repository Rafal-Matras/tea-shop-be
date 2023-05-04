import { Inject, Injectable } from '@nestjs/common';

import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import {
  CreateBasketResponse, DeleteBasketResponse, DeleteManyBasketResponse,
  FindManyBasketResponse,
  FindOneBasketResponse,
  UpdateBasketResponse
} from '../types/basket';

import { ProductService } from '../product/product.service';

import { Basket } from './entities/basket.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BasketService {

  constructor(
    @Inject(ProductService) private productService: ProductService
  ) {
  }

  async create(createBasket: CreateBasketDto, user: User): Promise<CreateBasketResponse> {
    try {
      const { count, packSize, productId } = createBasket;
      const product = await this.productService.findOne(productId);

      const basket = new Basket();
      basket.count = count;
      basket.packSize = packSize;

      await basket.save();

      basket.product = product;
      basket.user = user;

      await basket.save();

      return {
        isSuccess: true,
        id: basket.id
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.name
      };
    }
  }

  async findMany(id:string): Promise<FindManyBasketResponse> {
    try {
      const basket = await Basket
        .createQueryBuilder('basket')
        .where('basket.userId = :id', { id })
        .getMany();

      return {
        isSuccess: true,
        basket
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async findOne(id: string): Promise<FindOneBasketResponse> {
    try {
      const basket = await Basket.findOne({
        relations: ['product'],
        where: {
          id
        }
      });

      return {
        isSuccess: true,
        basket
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async update(id: string, updateBasket: UpdateBasketDto): Promise<UpdateBasketResponse> {
    try {
      const { count, packSize } = updateBasket;

      const basket = await Basket.findOne({
        where: {
          id
        }
      });

      basket.count = count ?? basket.count;
      basket.packSize = packSize ?? basket.packSize;

      await basket.save();

      return {
        isSuccess: true,
        basket
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async removeMany(id: string): Promise<DeleteManyBasketResponse> {
    try {
      await Basket
        .createQueryBuilder('basket')
        .delete()
        .where('basket.userId = :id', { id })
        .execute();

      return {
        isSuccess: true
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async remove(id: string): Promise<DeleteBasketResponse> {
    try {
      const basket = await Basket.findOne({
        where: {
          id
        }
      });

      await basket.remove();

      return {
        isSuccess: true
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }


}
