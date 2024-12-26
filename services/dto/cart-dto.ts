import { Cart, CartItem, Product, Variations } from '@prisma/client';

export type CartItemDto = CartItem & {
  variations: Variations & {
    product: Product;
  };
};

export interface CartDto extends Cart {
  CartItem: CartItemDto[];
  totalAmount: number;
}
