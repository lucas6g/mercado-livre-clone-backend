import { CreateCheckoutSessionDto } from 'src/modules/checkout/dto/create-checkout.dto';
import Stripe from 'stripe';
import { ICheckoutSessionProvider } from '../protocol/ICheckoutSessionProvider';

export class StripeCheckoutSessionProvider implements ICheckoutSessionProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
      appInfo: {
        name: 'mercado-livre',
        version: '0.1.0',
      },
    });
  }

  async createCheckoutSession({
    cartItems,
    clientReference,
  }: CreateCheckoutSessionDto): Promise<string> {
    const cartItemsMapped = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.product.title,
            images: [item.product.img_url],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const checkoutSession = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItemsMapped,
      mode: 'payment',
      client_reference_id: clientReference,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return checkoutSession.id;
  }
}
