import { Delivery, DocumentType } from '../../types';

export class CreateOrderDto {
  price: number;
  formOfDelivery: Delivery;
  userId:string | null;
  orderList: string;
  documentType: DocumentType;
  name: string;
  surName: string;
  companyName: string | null;
  nip: string | null;
  street: string;
  homeNumber: string;
  postCode: string;
  city: string;
  phone: string;
  otherDeliveryAddress: 1 | 0;
  deliveryName: string | null;
  deliverySurName: string | null;
  deliveryCompanyName: string | null;
  deliveryStreet: string | null;
  deliveryHomeNumber: string | null;
  deliveryPostCode: string | null;
  deliveryCity: string | null;

}