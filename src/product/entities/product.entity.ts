import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category, NumberBrews, NumberOfUnits, Unit } from '../../types';

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
    precision: 6,
    scale: 2,
    nullable: true,
    default: null
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
  ingredients: string;

  @Column({
    length: 60,
    nullable: true,
    default: null
  })
  countryOrigin: string;

  @Column({
    length: 60,
    nullable: true,
    default: null
  })
  amountBrew: string;

  @Column({
    length: 3,
    nullable: true,
    default: null
  })
  temperatureBrew: string;

  @Column({
    length: 7,
    nullable: true,
    default: null
  })
  timeBrew: string;

  @Column({
    type: 'enum',
    enum: NumberBrews,
    nullable: true,
    default: null
  })
  numberBrews: NumberBrews;

  @Column({
    length: 100,
    nullable: true,
    default: null
  })
  storageMethod: string;

  @Column({
    length: 20,
    nullable: true,
    default: null
  })
  coffeeSpecies: string;

  @Column({
    length: 200,
    nullable: true,
    default: null
  })
  howToBrew: string;

  @Column({
    type: 'smallint',
    nullable: true,
    default: null
  })
  capacity: number;

  @Column({
    length: 50,
    nullable: true,
    default: null
  })
  size: string;

}
