import { Module } from '@nestjs/common';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ProductModule } from '../product/product.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ProductModule,
    MailModule,
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule {
}
