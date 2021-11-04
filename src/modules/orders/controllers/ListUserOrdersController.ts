import { Controller, Get, Req } from '@nestjs/common';
import { ListUserOrdersService } from '../services/ListUserOrdersService';
import { Request } from 'express';

@Controller('orders')
export class ListUserOrdersController {
  constructor(private readonly listUserOrders: ListUserOrdersService) {}

  @Get()
  handle(@Req() request: Request) {
    const user_id = request.user.id;

    return this.listUserOrders.execute(user_id);
  }
}
