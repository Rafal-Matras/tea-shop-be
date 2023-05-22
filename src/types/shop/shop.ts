import { Category, ProductInterface } from './product';

export type ProductsList = Omit<ProductInterface, 'description' | 'forGift' | 'state' | 'onHomePage' | 'ingredients' | 'countryOrigin' | 'amountBrew' | 'temperatureBrew' | 'timeBrew' | 'numberBrews' | 'wayStore' | 'coffeeSpecies' | 'howToBrew' | 'capacity' | 'size'>

export interface SearchInterface {
  id: string;
  category: string;
  name: string;
  type: string[];
}

export type OneProduct = Omit<ProductInterface, 'onHomePage' | 'forGift'>

export type ProductListResponse = {
  products: ProductsList[];
  count: number;
  totalPages: number;
};

export type ProductListOnHomepageResponse = ProductsList[]

export type SearchListResponse = SearchInterface[]

export type OneProductResponse = OneProduct

export type GetPriceProductResponse = number

