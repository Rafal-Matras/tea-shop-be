import { Details } from '../../order/entities/details.entity';

export enum Status {
  new = 'nowe',
  implemented = 'w realizacji',
  sent = 'wysłane',
  done = 'zakończone'
}

export enum Delivery {
  paczkomat = 'paczkomat InPost',
  inpost = 'kurier InPost',
  gls = 'kurier GLS',
  dhl = 'kurier DHL',
  zabka = 'odbiór w Żabce',
}

export interface OrderInterface {
  id: string;
  orderNumber: string;
  createdAd: Date;
  price: number;
  status: Status;
  formOfDelivery: Delivery;
  trackingNumber: string;
}

export interface OrderFullInterface extends OrderInterface {
  details: Details;
}

export type CreateOrderResponse = string;

export type GetManyOrderResponse = OrderInterface[];

export type GetOneOrderResponse = OrderFullInterface;

export type UpdateOrderResponse = OrderInterface;

export type RemoveOrderResponse = string