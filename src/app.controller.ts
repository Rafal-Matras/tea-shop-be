import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductListOnHomepageResponse } from './types';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomepageProducts(): Promise<ProductListOnHomepageResponse> {
    return this.appService.getHomepageProducts();
  }
}
