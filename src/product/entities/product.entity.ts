import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category, NumberOfUnits, Unit } from '../../types';
import { Basket } from '../../basket/entities/basket.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Category
  })
  category: Category;

  @Column({
    length: 100
  })
  name: string;

  @Column('simple-array')
  type: string[];

  @Column({
    length: 2000
  })
  description: string;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2
  })
  price: number;

  @Column({
    length: 100
  })
  image: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 0
  })
  forGift: 1 | 0;

  @Column({
    type: 'enum',
    enum: Unit
  })
  unit: Unit;

  @Column({
    type: 'enum',
    enum: NumberOfUnits
  })
  numberOfUnits: NumberOfUnits;

  @Column({
    type: 'int',
    precision: 5
  })
  state: number;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 0
  })
  new: 1 | 0;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
    default: 0
  })
  promo: number;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 0
  })
  onHomePage: 1 | 0;

  @Column({
    length: 200,
    nullable: true,
    default: null
  })
  ingredients: string | null;

  @Column({
    length: 60,
    nullable: true,
    default: null
  })
  countryOrigin: string | null;

  @Column({
    length: 60,
    nullable: true,
    default: null
  })
  amountBrew: string | null;

  @Column({
    length: 6,
    nullable: true,
    default: null
  })
  temperatureBrew: string | null;

  @Column({
    length: 7,
    nullable: true,
    default: null
  })
  timeBrew: string | null;

  @Column({
   length:50,
    nullable: true,
    default: null
  })
  numberBrews: string | null;

  @Column({
    length: 100,
    nullable: true,
    default: null
  })
  storageMethod: string | null;

  @Column({
    length: 20,
    nullable: true,
    default: null
  })
  coffeeSpecies: string | null;

  @Column({
    length: 200,
    nullable: true,
    default: null
  })
  howToBrew: string | null;

  @Column({
    type: 'smallint',
    nullable: true,
    default: null
  })
  capacity: number | null;

  @Column({
    length: 50,
    nullable: true,
    default: null
  })
  size: string | null;

  @OneToMany(() => Basket, entity => entity.product)
  basket: Basket;

}
