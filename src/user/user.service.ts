import { Injectable } from '@nestjs/common';

import { DeliveryUserInterface, RemoveUserResponse, UserResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { Delivery } from './entities/delivery.entity';

import { hashPwd } from 'src/utils/hashPwd';
import { filterUserData } from '../utils/filterUserData';

@Injectable()
export class UserService {

  async createDetails(user: User, deliveryDto: DeliveryUserInterface) {
    const {
      deliveryName,
      deliverySurName,
      deliveryCompanyName,
      deliveryStreet,
      deliveryHomeNumber,
      deliveryPostCode,
      deliveryCity
    } = deliveryDto;

    if (deliveryName && deliverySurName && deliveryStreet && deliveryHomeNumber && deliveryPostCode && deliveryCity) {
      const delivery = new Delivery();
      delivery.deliveryName = deliveryName;
      delivery.deliverySurName = deliverySurName;
      delivery.deliveryCompanyName = deliveryCompanyName;
      delivery.deliveryStreet = deliveryStreet;
      delivery.deliveryHomeNumber = deliveryHomeNumber;
      delivery.deliveryPostCode = deliveryPostCode;
      delivery.deliveryCity = deliveryCity;

      await delivery.save();

      user.delivery = delivery;
      await user.save();
    }
  }

  async create(createUser: CreateUserDto): Promise<UserResponse | boolean> {
    const {
      email,
      pwdHash,
      documentType,
      name,
      surName,
      companyName,
      nip,
      street,
      homeNumber,
      postCode,
      city,
      phone
    } = createUser.userDto;

    if (await this.findOneByEmail(email)) {
      return false;
    }

    const user = new User();
    user.email = email;
    user.pwdHash = await hashPwd(pwdHash);
    user.documentType = documentType;
    user.name = name;
    user.surName = surName;
    user.companyName = companyName;
    user.nip = nip;
    user.street = street;
    user.homeNumber = homeNumber;
    user.postCode = postCode;
    user.city = city;
    user.phone = phone;

    await user.save();

    await this.createDetails(user, createUser.deliveryDto);

    return filterUserData(user);
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await User.find({
      relations: ['delivery']
    });

    return users.map(user => filterUserData(user));
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await User.findOne({
      relations: ['delivery'],
      where: {
        id
      }
    });
    return filterUserData(user);
  }

  async findOneByEmail(email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    return !!user;
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<UserResponse> {
    const {
      role,
      email,
      documentType,
      name,
      surName,
      companyName,
      nip,
      street,
      homeNumber,
      postCode,
      city,
      phone
    } = updateUser.userDto;
    const {
      deliveryName,
      deliverySurName,
      deliveryCompanyName,
      deliveryStreet,
      deliveryHomeNumber,
      deliveryPostCode,
      deliveryCity
    } = updateUser.deliveryDto;

    const user = await User.findOneOrFail({
      relations: ['delivery'],
      where: {
        id
      }
    });
    user.role = role ?? user.role;
    user.email = email ?? user.email;
    user.documentType = documentType ?? user.documentType;
    user.name = name ?? user.name;
    user.surName = surName ?? user.surName;
    user.companyName = companyName ?? user.companyName;
    user.nip = nip ?? user.nip;
    user.street = street ?? user.street;
    user.homeNumber = homeNumber ?? user.homeNumber;
    user.postCode = postCode ?? user.postCode;
    user.city = city ?? user.city;
    user.phone = phone ?? user.phone;

    await user.save();

    if (user.delivery) {
      const delivery = user.delivery;
      delivery.deliveryName = deliveryName ?? delivery.deliveryName;
      delivery.deliverySurName = deliverySurName ?? delivery.deliverySurName;
      delivery.deliveryCompanyName = deliveryCompanyName ?? delivery.deliveryCompanyName;
      delivery.deliveryStreet = deliveryStreet ?? delivery.deliveryStreet;
      delivery.deliveryHomeNumber = deliveryHomeNumber ?? delivery.deliveryHomeNumber;
      delivery.deliveryPostCode = deliveryPostCode ?? delivery.deliveryPostCode;
      delivery.deliveryCity = deliveryCity ?? delivery.deliveryCity;

      await delivery.save();

      user.delivery = delivery;
      await user.save();
    } else await this.createDetails(user, updateUser.deliveryDto);

    return filterUserData(user);
  }

  async remove(id: string): Promise<RemoveUserResponse> {

    const user = await User.findOneOrFail({
      where: {
        id
      }
    });

    if (!user) return { isSuccess: false };

    await user.remove();

    return {
      isSuccess: true,
      id
    };
  }

}