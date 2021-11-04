import { Controller, Delete, HttpCode, Req } from '@nestjs/common';
import { RemoveProductFromCartService } from '../services/RemoveProductFromCartService';
import { Request } from 'express';

@Controller('carts')
export class RemoveProductFromController {
  constructor(
    private readonly removeProductFromCartService: RemoveProductFromCartService,
  ) {}

  @Delete('/remove-product')
  @HttpCode(200)
  async handle(@Req() request: Request) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    const cart = await this.removeProductFromCartService.execute(
      user_id,
      String(product_id),
    );

    return cart;
  }
}
