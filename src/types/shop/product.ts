export enum Category {
  tea = 'herbaty',
  coffee = 'kawy',
  herbs = 'zioła',
  accessories = 'akcesoria',
}

export enum Unit {
  grams = 'g',
  pieces = 'szt',
}

export enum NumberOfUnits {
  one = 1,
  three = 3,
  twentyFifth = 25,
  fifty = 50,
  hundredth = 100,
}


export enum PromoEnum {
  no = 0,
  fifth = .05,
  then = .10,
  fifteen = .15,
  twenty = .20,
  twentyFifth = .25,
  thirty = .30
}

export interface ProductInterface {
  id: string;
  category: Category;
  type: string[];
  name: string;
  description: string;
  price: number;
  image: string;
  forGift: 1 | 0,
  unit: Unit;
  numberOfUnits: NumberOfUnits;
  state: number;
  new: 1 | 0;
  promo: PromoEnum;
  onHomePage: 1 | 0;
  ingredients: string | null;
  countryOrigin: string | null;
  amountBrew: string | null;
  temperatureBrew: string | null;
  timeBrew: string | null;
  numberBrews: string | null;
  storageMethod: string | null;
  coffeeSpecies: string | null;
  howToBrew: string | null;
  capacity: number | null;
  size: string | null;
  // basket: Basket;
}

export type CreateProductResponse = { id: string };

export type FindAllProductResponse = ProductInterface[];

export type FindOneProductResponse = ProductInterface;

export type FindByProductNameResponse = { ok: boolean };

export type UpdateProductResponse = ProductInterface;

export type RemoveProductResponse = string;




