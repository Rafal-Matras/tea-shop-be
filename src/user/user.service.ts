import { Inject, Injectable } from '@nestjs/common';

import { DeliveryUserInterface, FindOneUserResponse, UserResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePwdUserDto } from './dto/update-pwd-user.dto';

import { User } from './entities/user.entity';
import { Delivery } from './entities/delivery.entity';

import { hashPwd } from 'src/utils/hashPwd';
import { filterUserData } from '../utils/filterUserData';
import { MailService } from '../mail/mail.service';
import { config } from '../config/config';

@Injectable()
export class UserService {

  constructor(
    @Inject(MailService) private mailService: MailService
  ) {
  }

  async editDetails(user: User, deliveryDto: DeliveryUserInterface) {
    const {
      deliveryName,
      deliverySurName,
      deliveryCompanyName,
      deliveryStreet,
      deliveryFlatNumber,
      deliveryPostCode,
      deliveryCity
    } = deliveryDto;

    const saveNewDelivery = async (delivery: Delivery) => {
      delivery.deliveryName = deliveryName;
      delivery.deliverySurName = deliverySurName;
      delivery.deliveryCompanyName = deliveryCompanyName;
      delivery.deliveryStreet = deliveryStreet;
      delivery.deliveryFlatNumber = deliveryFlatNumber;
      delivery.deliveryPostCode = deliveryPostCode;
      delivery.deliveryCity = deliveryCity;

      await delivery.save();
      user.delivery = delivery;

      await user.save();

    };

    if (!deliveryName && !deliverySurName && !deliveryStreet && !deliveryFlatNumber && !deliveryPostCode && !deliveryCity) {
      const delivery = new Delivery();
      user.otherDeliveryAddress = 1;
      await user.save();
      await saveNewDelivery(delivery);
    } else {
      const delivery = user.delivery;
      await saveNewDelivery(delivery);
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
      flatNumber,
      postCode,
      city,
      phone,
      otherDeliveryAddress
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
    user.flatNumber = flatNumber;
    user.postCode = postCode;
    user.city = city;
    user.phone = phone;
    user.otherDeliveryAddress = otherDeliveryAddress;

    await user.save();
    if (user.otherDeliveryAddress) {
      await this.editDetails(user, createUser.deliveryDto);
    }

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

  async forgotPassword(email: string): Promise<{ ok: boolean }> {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) return {ok:false};
    user.forgotPwdExpiredAt = new Date(new Date().getTime() + 1000 * 60 * 10);
    await user.save();
    await this.mailService.forgotPassword(user.email, {
      user: user.name,
      forgotPasswordUrl: `${config.feUrl}/user/forgot-password/${encodeURIComponent(user.id)}`
    });

    return { ok: true };
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
      flatNumber,
      postCode,
      city,
      phone
    } = updateUser.userDto;

    const user = await User.findOne({
      relations: ['delivery'],
      where: {
        id
      }
    });

    if (user.email !== email) {
      const a = await this.findOneByEmail(email);
      if (a.ok) {
        return;
      }
      user.email = email ?? user.email;
    }

    user.role = role ?? user.role;
    user.documentType = documentType ?? user.documentType;
    user.name = name ?? user.name;
    user.surName = surName ?? user.surName;
    user.companyName = companyName ?? user.companyName;
    user.nip = nip ?? user.nip;
    user.street = street ?? user.street;
    user.flatNumber = flatNumber ?? user.flatNumber;
    user.postCode = postCode ?? user.postCode;
    user.city = city ?? user.city;
    user.phone = phone ?? user.phone;

    await user.save();

    if (updateUser.deliveryDto.deliveryName !== '') await this.editDetails(user, updateUser.deliveryDto);

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