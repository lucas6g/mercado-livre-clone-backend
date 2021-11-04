import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItems } from '../entities/cart_items.entity';

@Injectable()
export class RemoveProductFromCartService {
  @InjectRepository(Cart)
  private cartsRepository: Repository<Cart>;

  @InjectRepository(Product)
  private productsRepository: Repository<Product>;

  @InjectRepository(CartItems)
  private cartItemsRepository: Repository<CartItems>;

  async execute(user_id: string, product_id: string) {
    const cart = await this.cartsRepository.findOne({
      where: {
        user_id,
      },
    });

    const product = await this.productsRepository.findOne({
      where: {
        id: product_id,
      },
    });

    let cartItem = await this.cartItemsRepository.findOne({
      where: {
        cart,
        product,
      },
    });

    await this.cartItemsRepository
      .createQueryBuilder()
      .delete()
      .from(CartItems)
      .where('id = :id', { id: cartItem.id })
      .execute();

    await this.cartsRepository
      .createQueryBuilder()
      .update()
      .set({
        total: () => `total - ${product.price * cartItem.quantity}`,
      })
      .where('id = :id', { id: cart.id })
      .execute();

    return await this.cartsRepository.findOne({
      where: {
        user_id,
      },
    });
  }
}
