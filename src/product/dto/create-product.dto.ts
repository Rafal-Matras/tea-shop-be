import { Category, NumberBrews, NumberOfUnits, Unit } from '../../types';

export class CreateProductDto {
  category: Category;
  type: string[];
  name: string;
  description: string;
  price: number;
  image: string;
  forGift: 1 | 0;
  unit: Unit;
  numberOfUnits: NumberOfUnits | null;
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