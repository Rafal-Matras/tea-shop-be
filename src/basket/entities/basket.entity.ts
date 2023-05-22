import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PackSize } from '../../types';

import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Basket extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'smallint',
    precision: 2
  })
  count: number;

  @Column({
    type: 'enum',
    enum: PackSize,
    default: 1
  })
  packSize: PackSize;

  @ManyToOne(() => Product, entity => entity.basket)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, entity => entity.baskets)
  @JoinColumn()
  user: User;

}
