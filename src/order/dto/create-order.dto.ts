import { Delivery, DocumentType } from '../../types';

export class CreateOrderDto {
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