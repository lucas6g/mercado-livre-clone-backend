import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreateOrderService } from './services/CreateOrderService';
import { WebhookController } from './controllers/WebhookController';
import { StripeWehookProvider } from './providers/WebhookProvider/implementation/StripeWehookProvider';
import { Order } from './entities/order.entity';
import { Cart } from '../carts/entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from './entities/order_item.entity';
import { ListUserOrdersService } from './services/ListUserOrdersService';
import { ListUserOrdersController } from './controllers/ListUserOrdersController';
import { requireAuth } from '../users/middlewares/requireAuth';
import { CartItems } from '../carts/entities/cart_items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart, OrderItems, CartItems])],
  controllers: [WebhookController, ListUserOrdersController],
  providers: [
    CreateOrderService,
    ListUserOrdersService,
    {
      provide: 'StripeWehookProvider',
      useClass: StripeWehookProvider,
    },
  ],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requireAuth).forRoutes('orders');
  }
}
