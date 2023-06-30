import { CreateOrder } from '../../types';
import { Basket } from '../../basket/entities/basket.entity';

export class CreateOrderDto {
  dataOrder: CreateOrder;
  basket: Basket[] | [];
}