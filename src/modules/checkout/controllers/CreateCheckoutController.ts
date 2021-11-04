import { Controller, Post, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCheckoutService } from 'src/modules/checkout/services/CreateCheckoutService';

@Controller('checkout')
export class CreateCheckoutController {
  constructor(private readonly createCheckoutService: CreateCheckoutService) {}
  @Post()
  @HttpCode(201)
  handle(@Req() request: Request) {
    const user_id = request.user.id;

    return this.createCheckoutService.execute(user_id);
  }
}
