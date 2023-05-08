import { NumberOfUnits } from '../../types';
import { Product } from '../../product/entities/product.entity';

export interface BasketInterface {
  id: string;
  count: number;
  packSize: NumberOfUnits;
  product: Product
}

export type CreateBasketResponse = BasketInterface;

export type FindOneBasketResponse = BasketInterface;

export type FindManyBasketResponse = BasketInterface[];

export type UpdateBasketResponse = BasketInterface;

export type DeleteBasketResponse = boolean;

export type DeleteManyBasketResponse = boolean;

export type BasketFullPriceResponse = number;


