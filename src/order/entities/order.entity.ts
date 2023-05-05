import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery, Status } from '../../types';
import { User } from '../../user/entities/user.entity';
import { Details } from './details.entity';

@Entity()
export class Order extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 13
  })
  orderNumber: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAd: Date;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2
  })
  price: number;

  @Column({
    type:'enum',
    enum:Status,
    default:Status.new,
  })
  status: Status;

  @Column({
    type:'enum',
    enum:Delivery,
  })
  formOfDelivery:Delivery;

  @Column({
    length:30,
    nullable:true,
    default:null,
  })
  trackingNumber: string;

  @OneToOne(()=> Details, entity => entity.order)
  @JoinColumn()
  details:Details;

  @ManyToOne(() => User, entity => entity.orders)
  @JoinColumn()
  user: User;
}
