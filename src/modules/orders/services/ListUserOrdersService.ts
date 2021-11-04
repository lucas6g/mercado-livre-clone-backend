import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class ListUserOrdersService {
  @InjectRepository(Order)
  private ordersRepository: Repository<Order>;

  async execute(user_id: string) {
    return await this.ordersRepository.find({
      where: {
        user_id,
      },
      relations: ['orderItems', 'orderItems.product'],
      order: {
        created_at: 'DESC',
      },
    });
  }
}
