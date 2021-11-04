import Stripe from 'stripe';

export class StripeWehookProvider {
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

  async custructEvent(
    signature: string | string[],
    payload: Buffer,
    secret: string,
  ): Promise<Stripe.Event> {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      secret,
    );

    return event;
  }
}
