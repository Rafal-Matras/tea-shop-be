export enum PackSize {
  one = 1,
  fifth = 5,
  ten = 10
}

export interface BasketInterface {
  id: string;
  count: number;
  packSize: PackSize;
}

export type CreateBasketResponse = { id: string };

export type FindOneBasketResponse = BasketInterface;

export type FindManyBasketResponse = BasketInterface[];

export type UpdateBasketResponse = boolean;

export type DeleteBasketResponse = boolean;

export type DeleteManyBasketResponse = boolean;

export type BasketFullPriceResponse = number;


