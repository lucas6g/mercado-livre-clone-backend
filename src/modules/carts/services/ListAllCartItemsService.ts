import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class ListAllCartItemsService {
  @InjectRepository(Cart)
  private cartsRepository: Repository<Cart>;

  async execute(user_id: string) {
    return await this.cartsRepository.findOne({
      where: {
        user_id,
      },
      relations: ['cartItems', 'cartItems.product'],
    });
  }
}
