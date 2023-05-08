import { Column } from 'typeorm';

export enum Role {
  admin = 'Admin',
  user = 'User',
}

export enum DocumentType {
  receipt = 'Paragon',
  invoice = 'Faktura VAT',
}

export interface DeliveryUserInterface {
  id: string;
  deliveryName: string;
  deliverySurName: string;
  deliveryCompanyName: string;
  deliveryStreet: string;
  deliveryHomeNumber: string;
  deliveryPostCode: string;
  deliveryCity: string;
}

export interface UserInterface {
  id: string;
  role: Role;
  email: string;
  pwdHash: string;
  currentTokenId:string | null,
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
  otherDeliveryAddress: number;
  delivery:DeliveryUserInterface;
}

export type UserResponse = Omit<UserInterface, 'pwdHash' | 'currentTokenId'>

export type CreateUserResponse = UserResponse | boolean;

export type UpdateUserResponse = UserResponse;

export type FindAllUserResponse = UserResponse[];

export type FindOneUserResponse = UserResponse;

export type RemoveUserResponse = boolean

