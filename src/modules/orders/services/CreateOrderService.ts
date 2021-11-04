import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { CartItems } from 'src/modules/carts/entities/cart_items.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { OrderStatus } from '../entities/enum/OrderStatus';
import { Order } from '../entities/order.entity';
import { OrderItems } from '../entities/order_item.entity';
import { StripeWehookProvider } from '../providers/WebhookProvider/implementation/StripeWehookProvider';

@Injectable()
export class CreateOrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,

    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,

    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,

    @Inject('StripeWehookProvider')
    private stripeWehookProvider: StripeWehookProvider,
  ) {}

  async execute(signature: string | string[], payload: Buffer) {
    const event = await this.stripeWehookProvider.custructEvent(
      signature,
      payload,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    const { type } = event;

    //craindo um pedido
    if (type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      const user_id = checkoutSession.client_reference_id;

      const cart = await this.cartsRepository.findOne({
        where: {
          user_id,
        },
        relations: ['cartItems', 'cartItems.product'],
      });

      const order = await this.ordersRepository.save({
        user_id,
        status: OrderStatus.ORDER_DELIVERED,
        total: cart.total,
      });

      const orderItems = cart.cartItems.map((items) => {
        return {
          order,
          product: items.product,
          quantity: items.quantity,
        };
      });

      await this.orderItemsRepository.save(orderItems);

      //limpando carrinho

      await this.cartItemsRepository.remove(cart.cartItems);

      await this.cartsRepository
        .createQueryBuilder()
        .update()
        .set({
          total: 0.0,
        })
        .where('id = :id', { id: cart.id })
        .execute();
    }
  }
}
