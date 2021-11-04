import { Module } from '@nestjs/common';
import { ProductsService } from './ProductsService';
import { ProductsController } from './ProductController';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
