type CartItem = {
  quantity: number;
  product: {
    title: string;
    price: number;
    img_url: string;
  };
};

export interface CreateCheckoutSessionDto {
  cartItems: CartItem[];
  clientReference: string;
}
