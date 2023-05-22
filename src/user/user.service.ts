import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DeliveryUserInterface, FindOneUserResponse, UserResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { Delivery } from './entities/delivery.entity';

import { hashPwd } from 'src/utils/hashPwd';
import { filterUserData } from '../utils/filterUserData';
import { MailService } from '../mail/mail.service';
import { config } from '../config/config';
import { UpdatePwdUserDto } from './dto/update-pwd-user.dto';

@Injectable()
export class UserService {

  constructor(
    @Inject(MailService) private mailService: MailService
  ) {
  }

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

  async create(createUser: CreateUserDto): Promise<{ ok: boolean }> {
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
      phone,
      otherDeliveryAddress,
    } = createUser.userDto;

    if (!await this.findOneByEmail(email)) {
      return { ok: false };
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
    user.otherDeliveryAddress = otherDeliveryAddress;

    await user.save();
    await this.createDetails(user, createUser.deliveryDto);

    return { ok: true };
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await User.find({
      relations: ['delivery']
    });

    return users.map(user => filterUserData(user));
  }

  async findOne(id: string): Promise<FindOneUserResponse> {
    const user = await User.findOneOrFail({
      relations: ['delivery'],
      where: {
        id
      }
    });

    if (!user) return { ok: false };

    return {
      ok: true,
      user: filterUserData(user)
    };
  }

  async findOneByEmail(email: string): Promise<FindOneUserResponse> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) return { ok: false };

    return {
      ok: true,
      user: filterUserData(user)
    };
  }

  async forgetPassword(email: string): Promise<{ ok: boolean }> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) throw new NotFoundException();

    user.forgotPwdExpiredAt = new Date(new Date().getTime() + 1000 * 60 * 10);
    await user.save();

    await this.mailService.forgotPassword(user.email, {
      user: user.name,
      forgotPasswordUrl: `${config.feUrl}/forgot-password/${user.id}`
    });


    return { ok: true };

  }

  // async updatePwd(newPwd: UpdatePwdUserDto) {
  //   const { userToken, pwd } = newPwd;
  //   const user = await User.findOne({
  //     where: {
  //       userToken
  //     }
  //   });
  //
  //   if (!user) throw new NotFoundException();
  //   if(user.userTokenExpiredAt < new Date()) throw new RequestTimeoutException()
  //
  //
  // }

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

  async remove(id: string): Promise<{ ok: boolean }> {

    const user = await User.findOneOrFail({
      where: {
        id
      }
    });

    if (!user) return { ok: false };

    await user.remove();

    return { ok: true };
  }

  async updatePwd(id: string, newPwd: UpdatePwdUserDto): Promise<{ ok: boolean }> {
    const user = await User.findOne({
      where: {
        id
      }
    });
    if (!user) return { ok: false };

    user.pwdHash = await hashPwd(newPwd.pwd);

    await user.save();

    return { ok: true };
  }
}