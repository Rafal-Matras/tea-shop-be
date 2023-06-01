import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Delivery extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20
  })
  deliveryName: string;

  @Column({
    length: 30
  })
  deliverySurName: string;

  @Column({
    length: 100,
  })
  deliveryCompanyName: string;

  @Column({
    length: 40
  })
  deliveryStreet: string;

  @Column({
    length: 15
  })
  deliveryFlatNumber: string;

  @Column({
    length: 8
  })
  deliveryPostCode: string;

  @Column({
    length: 30
  })
  deliveryCity: string;

  @OneToOne(() => User, entity => entity.delivery)
  user:User;

}