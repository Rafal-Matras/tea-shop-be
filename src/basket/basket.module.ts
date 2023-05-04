import { Module } from '@nestjs/common';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ProductModule
  ],
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {
}
