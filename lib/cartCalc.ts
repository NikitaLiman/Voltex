import { CartItemDto } from '../services/dto/cart-dto';

export const CalcCart = (item: CartItemDto, selectedVariation: number) => {
  const price = item.variations.price[selectedVariation];

  return price * item.quanity;
};
