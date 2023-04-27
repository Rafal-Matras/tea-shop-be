import { ProductInterface } from './product';

export type ProductsList = Omit<ProductInterface, 'description' | 'forGift' | 'state' | 'onHomePage' | 'ingredients' | 'countryOrigin' | 'amountBrew' | 'temperatureBrew' | 'timeBrew' | 'numberBrews' | 'wayStore' | 'coffeeSpecies' | 'howToBrew' | 'capacity' | 'size'>

export type OneProduct = Omit<ProductInterface, 'onHomePage' | 'forGift'>

export type ProductListResponse = ProductsList[];

export type OneProductResponse = OneProduct