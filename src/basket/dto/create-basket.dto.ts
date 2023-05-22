import { PackSize } from '../../types';

export class CreateBasketDto {
  count: number;
  packSize: PackSize;
  productId:string;
}
