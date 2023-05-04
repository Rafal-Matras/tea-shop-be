import { NumberOfUnits } from '../../types';

export class CreateBasketDto {
  id: string;
  count: number;
  packSize: NumberOfUnits;
  productId:string;
}
