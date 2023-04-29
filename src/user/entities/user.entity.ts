import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DocumentType, Role } from '../../types/user/user';

import { Delivery } from './delivery.entity';
import { Basket } from '../../basket/entities/basket.entity';

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
    length: 36,
    nullable: true,
    default: null
  })
  currentTokenId: string | null;

  @Column({
    type: 'enum',
    enum: DocumentType
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

  @OneToOne(type => Delivery, entity => entity.user)
  @JoinColumn()
  delivery: Delivery;

  @OneToMany(type => Basket, entity => entity.user)
  baskets: Basket[];

}
