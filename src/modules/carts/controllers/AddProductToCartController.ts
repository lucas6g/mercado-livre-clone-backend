import { Controller, Put, Req } from '@nestjs/common';
import { AddProductToCartService } from '../services/AddProductToCartService';
import { Request } from 'express';

@Controller('carts')
export class AddProductToCartController {
  constructor(
    private readonly addProductToCartService: AddProductToCartService,
  ) {}

  @Put('/add-product')
  handle(@Req() request: Request) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    return this.addProductToCartService.execute(user_id, String(product_id));
  }
}
