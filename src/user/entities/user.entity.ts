import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DocumentType, Role } from '../../types/user/user';

import { Delivery } from './delivery.entity';
import { Basket } from '../../basket/entities/basket.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user
  })
  role: Role;

  @Column({
    length: 255,
    unique: true
  })
  email: string;

  @Column({
    length: 60
  })
  pwdHash: string;

  @Column({
    type: 'datetime',
    nullable: true,
    default: null,
  })
  forgotPwdExpiredAt: Date | null;

  @Column({
    length: 36,
    nullable: true,
    default: null
  })
  currentTokenId: string | null;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default:DocumentType.receipt
  })
  documentType: DocumentType;

  @Column({
    length: 20
  })
  name: string;

  @Column({
    length: 30
  })
  surName: string;

  @Column({
    length: 100,
  })
  companyName: string ;

  @Column({
    length: 13,
  })
  nip: string ;

  @Column({
    length: 40
  })
  street: string;

  @Column({
    length: 15
  })
  flatNumber: string;

  @Column({
    length: 8
  })
  postCode: string;

  @Column({
    length: 30
  })
  city: string;

  @Column({
    length: 17
  })
  phone: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 0
  })
  otherDeliveryAddress: 1 | 0;

  @OneToOne(() => Delivery, entity => entity.user)
  @JoinColumn()
  delivery: Delivery;

  @OneToMany(() => Basket, entity => entity.user)
  baskets: Basket[];

  @OneToMany(() => Order, entity => entity.user)
  orders: Order[];

}
