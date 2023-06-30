import { Details } from '../../order/entities/details.entity';
import { DocumentType } from '../user';

export enum Status {
  new = 'nowe',
  implemented = 'w realizacji',
  sent = 'wysłane',
  done = 'zakończone'
}

export enum Delivery {
  paczkomat = 'paczkomat Inpost',
  inpost = 'kurier Inpost',
  gls = 'kurier GLS',
  dhl = 'kurier DHL',
  zabka = 'odbiór w żabce',
}

export interface OrderInterface {
  id: string;
  orderNumber: string;
  createdAd: Date;
  price: number;
  status: Status;
  formOfDelivery: Delivery;
  deliveryCost:number;
  trackingNumber: string;
}

export interface OrderFullInterface extends OrderInterface {
  details: Details;
}

export interface CreateOrder{
  price: number;
  formOfDelivery: Delivery;
  deliveryCost:number;
  orderList: string;
  userId:string | null;
  email:string;
  documentType: DocumentType;
  name: string;
  surName: string;
  companyName: string | null;
  nip: string | null;
  street: string;
  flatNumber: string;
  postCode: string;
  city: string;
  phone: string;
  otherDeliveryAddress: 1 | 0;
  deliveryName: string | null;
  deliverySurName: string | null;
  deliveryCompanyName: string | null;
  deliveryStreet: string | null;
  deliveryFlatNumber: string | null;
  deliveryPostCode: string | null;
  deliveryCity: string | null;
}

export type CreateOrderResponse = {
  ok: true,
  orderNumber: string
} | {
  ok: false
};

export type GetManyOrderResponse = OrderInterface[];

export type GetOneOrderResponse = OrderFullInterface;

export type UpdateOrderResponse = OrderInterface;

export type RemoveOrderResponse = string