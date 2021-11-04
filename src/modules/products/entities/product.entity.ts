import { CartItems } from 'src/modules/carts/entities/cart_items.entity';
import { OrderItems } from 'src/modules/orders/entities/order_item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('decimal')
  price: number;

  @Column('varchar')
  img_url: string;

  @OneToMany(() => CartItems, (cartItems) => cartItems.product)
  cartItems: CartItems[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems: OrderItems[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
