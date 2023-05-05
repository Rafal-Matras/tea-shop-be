import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  CreateOrderResponse,
  GetManyOrderResponse,
  GetOneOrderResponse,
  RemoveOrderResponse,
  UpdateOrderResponse
} from '../types';

import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { Details } from './entities/details.entity';

@Injectable()
export class OrderService {

  async create(createOrder: CreateOrderDto): Promise<CreateOrderResponse> {
    try {
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

      return {
        isSuccess: true,
        orderNumber: order.orderNumber
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async findAll(id: string): Promise<GetManyOrderResponse> {
    try {
      const orders = await Order
        .createQueryBuilder('order')
        .where('order.userId = :id', { id })
        .getMany();
      console.log(orders);
      return {
        isSuccess: true,
        orders
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async findOne(id: string): Promise<GetOneOrderResponse> {
    try {
      const order = await Order.findOne({
        relations: ['details'],
        where: {
          id
        }
      });

      return {
        isSuccess: true,
        order
      };

    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }

  }

  async update(id: string, updateOrder: UpdateOrderDto): Promise<UpdateOrderResponse> {
    try {
      const { status, trackingNumber } = updateOrder;
      const order = await Order.findOne({
        where: {
          id
        }
      });

      order.status = status ?? order.status;
      order.trackingNumber = trackingNumber ?? order.trackingNumber;

      await order.save();

      return {
        isSuccess: true,
        order
      };

    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }

  async remove(id: string): Promise<RemoveOrderResponse> {
    try {

      const order = await Order.findOne({
        where: {
          id
        }
      });

      await order.remove();

      return {
        isSuccess: true
      };
    } catch (err) {
      return {
        isSuccess: false,
        err: err.message
      };
    }
  }
}
