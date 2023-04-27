import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductListResponse } from './types';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomepageProducts(): Promise<ProductListResponse> {
    return this.appService.getHomepageProducts();
  }
}
