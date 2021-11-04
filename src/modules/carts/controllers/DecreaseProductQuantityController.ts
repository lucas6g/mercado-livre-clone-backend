import { Controller, Put, Req } from '@nestjs/common';
import { DecreaseProductQuantityService } from '../services/DecreaseProductQuantityService';
import { Request } from 'express';

@Controller('carts')
export class DecreaseProductQuantityController {
  constructor(
    private readonly decreaseProductQuantity: DecreaseProductQuantityService,
  ) {}

  @Put('/decrease-product-quantity')
  handle(@Req() request: Request) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    return this.decreaseProductQuantity.execute(user_id, String(product_id));
  }
}
