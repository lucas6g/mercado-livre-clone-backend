import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItems } from '../entities/cart_items.entity';

@Injectable()
export class AddProductToCartService {
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

    //se o produto ja estiver no carrinho
    if (cartItem) {
      await this.cartItemsRepository
        .createQueryBuilder()
        .update()
        .set({
          quantity: () => 'quantity + 1',
        })
        .where('id = :id', { id: cartItem.id })
        .execute();

      await this.cartsRepository
        .createQueryBuilder()
        .update()
        .set({
          total: () => `total + ${product.price}`,
        })
        .where('id = :id', { id: cart.id })
        .execute();
    } else {
      cartItem = await this.cartItemsRepository.save({
        cart,
        product,
        quantity: 1,
      });
      await this.cartsRepository
        .createQueryBuilder()
        .update()
        .set({
          total: () => `total + ${product.price}`,
        })
        .where('id = :id', { id: cart.id })
        .execute();
    }

    return await this.cartItemsRepository.findOne({
      where: {
        id: cartItem.id,
      },
      relations: ['product', 'cart'],
    });
  }
}
