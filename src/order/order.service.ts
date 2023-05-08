import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderFullInterface, OrderInterface } from '../types';

import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { Details } from './entities/details.entity';

@Injectable()
export class OrderService {

  async create(createOrder: CreateOrderDto): Promise<string> {
    const {
      price,
      formOfDelivery,
      userId,
      orderList,
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
      deliveryName,
      deliverySurName,
      deliveryCompanyName,
      deliveryStreet,
      deliveryHomeNumber,
      deliveryPostCode,
      deliveryCity
    } = createOrder;
    const date = new Date();
    const dateYear = date.getFullYear().toString().slice(2);
    const dateMonth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const dateDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const dateHours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const dateMinutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const number = Math.floor(Math.random() * (1000 - 100) + 100);
    const orderNumber = `${dateYear}${dateMonth}${dateDate}${dateHours}${dateMinutes}${number}`;

    const order = new Order();
    order.orderNumber = orderNumber;
    order.price = price;
    order.formOfDelivery = formOfDelivery;

    await order.save();

    const details = new Details();
    details.orderList = orderList;
    details.documentType = documentType;
    details.name = name;
    details.surName = surName;
    details.companyName = companyName;
    details.nip = nip;
    details.street = street;
    details.homeNumber = homeNumber;
    details.postCode = postCode;
    details.city = city;
    details.phone = phone;
    details.otherDeliveryAddress = otherDeliveryAddress;
    details.deliveryName = deliveryName;
    details.deliverySurName = deliverySurName;
    details.deliveryCompanyName = deliveryCompanyName;
    details.deliveryStreet = deliveryStreet;
    details.deliveryHomeNumber = deliveryHomeNumber;
    details.deliveryPostCode = deliveryPostCode;
    details.deliveryCity = deliveryCity;

    await details.save();

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    order.details = details;
    order.user = user;
    await order.save();

    return order.orderNumber;
  }

  async findAll(id: string): Promise<OrderInterface[]> {
    return  await Order
      .createQueryBuilder('order')
      .where('order.userId = :id', { id })
      .getMany();

  }

  async findOne(id: string): Promise<OrderFullInterface> {
    return  await Order.findOne({
      relations: ['details'],
      where: {
        id
      }
    });
  }

  async update(id: string, updateOrder: UpdateOrderDto): Promise<OrderInterface> {
    const { status, trackingNumber } = updateOrder;
    const order = await Order.findOne({
      where: {
        id
      }
    });

    order.status = status ?? order.status;
    order.trackingNumber = trackingNumber ?? order.trackingNumber;

    await order.save();

    return order;
  }

  async remove(id: string): Promise<string> {
    const order = await Order.findOne({
      where: {
        id
      }
    });

    await order.remove();

    return id;
  }

}
