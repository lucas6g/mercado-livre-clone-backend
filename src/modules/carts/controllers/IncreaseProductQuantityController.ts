import { Controller, Put, Req } from '@nestjs/common';
import { IncreaseProductQuantityService } from '../services/IncreaseProductQuantityService';
import { Request } from 'express';

@Controller('carts')
export class IncreaseProductQuantityController {
  constructor(
    private readonly increaseProductQuantity: IncreaseProductQuantityService,
  ) {}

  @Put('/increase-product-quantity')
  handle(@Req() request: Request) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    return this.increaseProductQuantity.execute(user_id, String(product_id));
  }
}
