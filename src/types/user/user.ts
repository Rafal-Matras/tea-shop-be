export enum Role {
  admin = 'admin',
  user = 'user',
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
  forgotPwdExpiredAt: Date | null;
  currentTokenId: string | null,
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
  otherDeliveryAddress: 0 | 1;
  delivery: DeliveryUserInterface;
}

export type UserResponse = Omit<UserInterface, 'pwdHash' | 'currentTokenId'>

export type CreateUserResponse = { ok: boolean };

export type UpdateUserResponse = UserResponse;

export type UpdatePwdUserResponse = { ok: boolean };

export type FindAllUserResponse = UserResponse[];

export type FindOneUserResponse = {
  ok: true,
  user: UserResponse,
} | {
  ok: false
};
export type RemoveUserResponse = { ok: boolean };
export type ForgotPasswordResponse = { ok: boolean };

