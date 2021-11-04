import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { ProductsModule } from './modules/products/Products';
import { CartsModule } from './modules/carts/carts.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';

TypeOrmModule.forRootAsync({
  useFactory: async () =>
    Object.assign(await getConnectionOptions(), {
      autoLoadEntities: true,
    }),
});



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UsersModule,
    ProductsModule,
    CartsModule,
    CheckoutModule,
    OrdersModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
