import { User } from '../user/entities/user.entity';
import { UserResponse } from '../types';

export const filterUserData =(user: User): UserResponse => {
  const {
    id,
    role,
    email,
    documentType,
    name,
    surName,
    companyName,
    nip,
    street,
    flatNumber,
    postCode,
    city,
    phone,
    delivery,
    otherDeliveryAddress,
    forgotPwdExpiredAt,
  } = user;
  return {
    id,
    role,
    email,
    documentType,
    name,
    surName,
    companyName,
    nip,
    street,
    flatNumber,
    postCode,
    city,
    phone,
    delivery,
    otherDeliveryAddress,
    forgotPwdExpiredAt,
  };
}