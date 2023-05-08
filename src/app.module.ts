import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    ShopModule,
    UserModule,
    AuthModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
