import { Status } from '../../types';

export class UpdateOrderDto {
  status: Status;
  trackingNumber: string;
}
