import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreateCheckoutService } from './services/CreateCheckoutService';
import { CreateCheckoutController } from './controllers/CreateCheckoutController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { StripeCheckoutSessionProvider } from './providers/CheckoutSessionProvider/implementation/StripeCheckoutSessionProvider';
import { requireAuth } from '../users/middlewares/requireAuth';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CreateCheckoutController],
  providers: [
    CreateCheckoutService,
    {
      provide: 'CheckoutSessionProvider',
      useClass: StripeCheckoutSessionProvider,
    },
  ],
})
export class CheckoutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requireAuth).forRoutes('checkout');
  }
}
