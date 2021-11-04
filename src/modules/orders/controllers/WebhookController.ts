import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderService } from 'src/modules/orders/services/CreateOrderService';
import { Headers } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async handle(@Body() raw: Buffer, @Headers() headers) {
    const signature = headers['stripe-signature'];

    const order = await this.createOrderService.execute(signature, raw);

    return order;
  }
}
