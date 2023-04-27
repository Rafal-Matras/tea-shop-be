export enum Category {
  tea = 'herbata',
  coffee = 'kawa',
  herbs = 'zioła',
  accessories = 'akcesoria',
}

export enum Unit {
  grams = 'g',
  pieces = 'szt',
}

export enum NumberOfUnits {
  one = 1,
  two = 50,
  three = 100,
}

export enum NumberBrews {
  one = 'jedno',
  two = 'dwa',
  three = 'trzy',
  four = 'cztery',
  fift = 'pięć',
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
  promo: number | null;
  onHomePage: 1 | 0;
  ingredients: string | null;
  countryOrigin: string | null;
  amountBrew: string | null;
  temperatureBrew: string | null;
  timeBrew: string | null;
  numberBrews: NumberBrews | null;
  storageMethod: string | null;
  coffeeSpecies: string | null;
  howToBrew: string | null;
  capacity: number | null;
  size: string | null;
}

export type CreateProductResponse = ProductInterface;

export type FindAllProductResponse = ProductInterface[];

export type FindOneProductResponse = ProductInterface;

export type UpdateProductResponse = ProductInterface;

export type RemoveProductResponse = {
  id: string
}

