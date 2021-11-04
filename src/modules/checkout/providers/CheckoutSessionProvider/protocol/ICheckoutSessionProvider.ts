import { CreateCheckoutSessionDto } from 'src/modules/checkout/dto/create-checkout.dto';

export interface ICheckoutSessionProvider {
  createCheckoutSession(items: CreateCheckoutSessionDto): Promise<string>;
}
