import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { ICheckoutSessionProvider } from '../providers/CheckoutSessionProvider/protocol/ICheckoutSessionProvider';

type Response = {
  checkoutSessionId: string;
};

@Injectable()
export class CreateCheckoutService {
  constructor(
    @Inject('CheckoutSessionProvider')
    private checkoutSessionProvider: ICheckoutSessionProvider,
  ) {}

  @InjectRepository(Cart)
  private cartsRepository: Repository<Cart>;

  async execute(user_id: string): Promise<Response> {
    const cart = await this.cartsRepository.findOne({
      where: {
        user_id,
      },
      relations: ['cartItems', 'cartItems.product'],
    });

    const checkoutSessionId =
      await this.checkoutSessionProvider.createCheckoutSession({
        cartItems: cart.cartItems,
        clientReference: user_id,
      });

    return {
      checkoutSessionId,
    };
  }
}
