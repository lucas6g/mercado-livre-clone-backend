import { Controller, Get, Req } from '@nestjs/common';
import { ListAllCartItemsService } from '../services/ListAllCartItemsService';
import { Request } from 'express';

@Controller('carts')
export class ListAllCartItemsController {
  constructor(private readonly listAllCartItems: ListAllCartItemsService) {}

  @Get('/items')
  handle(@Req() request: Request) {
    const user_id = request.user.id;

    return this.listAllCartItems.execute(user_id);
  }
}
