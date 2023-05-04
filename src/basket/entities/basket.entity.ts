import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { NumberOfUnits } from '../../types';

import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Basket extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({
    type:'smallint',
    precision:3,
  })
  count:number;

  @Column()
  packSize: NumberOfUnits;

  @ManyToOne(type=>Product , entity => entity.basket)
  @JoinColumn()
  product:Product

  @ManyToOne(type => User, entity => entity.baskets)
  @JoinColumn()
  user:User

}
