import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MailModule } from '../mail/mail.module';
import { ProductModule } from '../product/product.module';
import { BasketModule } from '../basket/basket.module';

@Module({
  imports: [MailModule, ProductModule, BasketModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {
}
