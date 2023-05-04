import { NumberOfUnits, ProductInBasket } from '../../types';

import { User } from '../../user/entities/user.entity';

export interface BasketInterface {
  id: string;
  count: number;
  packSize: NumberOfUnits;
  product: ProductInBasket;
  user: User;
}

export type CreateBasketResponse = {
  isSuccess: true;
  id: string;
} | {
  isSuccess: false;
  err: string;
};

export type FindOneBasketResponse = {
  isSuccess: true;
  basket: BasketInterface;
} | {
  isSuccess: false;
  err: string;
};

export type FindManyBasketResponse = {
  isSuccess: true;
  basket: BasketInterface[];
} | {
  isSuccess: false;
  err: string;
};

export type UpdateBasketResponse = {
  isSuccess: true;
  basket: BasketInterface;
} | {
  isSuccess: false;
  err: string;
};

export type DeleteBasketResponse = {
  isSuccess: true;
} | {
  isSuccess: false;
  err: string;
};

export type DeleteManyBasketResponse = {
  isSuccess: true;
} | {
  isSuccess: false;
  err: string;
};

export type BasketFullPriceResponse = {
  isSuccess: true;
  price: number;
} | {
  isSuccess: false;
  err: string;
};


