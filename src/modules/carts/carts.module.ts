import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AddProductToCartService } from './services/AddProductToCartService';
import { RemoveProductFromCartService } from './services/RemoveProductFromCartService';
import { IncreaseProductQuantityService } from './services/IncreaseProductQuantityService';
import { DecreaseProductQuantityService } from './services/DecreaseProductQuantityService';
import { ListAllCartItemsService } from './services/ListAllCartItemsService';

import { AddProductToCartController } from './controllers/AddProductToCartController';
import { RemoveProductFromController } from './controllers/RemoveProductFromCartController';
import { IncreaseProductQuantityController } from './controllers/IncreaseProductQuantityController';
import { DecreaseProductQuantityController } from './controllers/DecreaseProductQuantityController';
import { ListAllCartItemsController } from './controllers/ListAllCartItemsController';

import { requireAuth } from '../users/middlewares/requireAuth';

import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from './entities/cart_items.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItems, Product])],
  controllers: [
    AddProductToCartController,
    RemoveProductFromController,
    IncreaseProductQuantityController,
    DecreaseProductQuantityController,
    ListAllCartItemsController,
  ],
  providers: [
    AddProductToCartService,
    RemoveProductFromCartService,
    IncreaseProductQuantityService,
    DecreaseProductQuantityService,
    ListAllCartItemsService,
  ],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requireAuth).forRoutes('carts');
  }
}
