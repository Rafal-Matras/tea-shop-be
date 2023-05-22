import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentType } from '../../types';
import { Order } from './order.entity';

@Entity()
export class Details extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text'
  })
  orderList: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.receipt
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
    nullable: true,
    default: null
  })
  companyName: string | null;

  @Column({
    length: 13,
    nullable: true,
    default: null
  })
  nip: string | null;

  @Column({
    length: 40
  })
  street: string;

  @Column({
    length: 15
  })
  homeNumber: string;

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

  @Column({
    length: 20,
    nullable: true,
    default: null
  })
  deliveryName: string | null;

  @Column({
    length: 30,
    nullable: true,
    default: null
  })
  deliverySurName: string | null;

  @Column({
    length: 100,
    nullable: true,
    default: null
  })
  deliveryCompanyName: string | null;

  @Column({
    length: 40,
    nullable: true,
    default: null
  })
  deliveryStreet: string | null;

  @Column({
    length: 15,
    nullable: true,
    default: null
  })
  deliveryHomeNumber: string | null;

  @Column({
    length: 8,
    nullable: true,
    default: null
  })
  deliveryPostCode: string | null;

  @Column({
    length: 30,
    nullable: true,
    default: null
  })
  deliveryCity: string | null;

  @OneToOne(() => Order, entity => entity.details)
  order: Order;

}