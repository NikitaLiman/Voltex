import { CartDto } from '../services/dto/cart-dto';
export type ICartItem = {
  id: number;
  quanity: number;
  cartId: number;
  selectedColor: number;
  selectedVariation: number;
  variationItemId: number;
  variations: {
    color: [
      {
        nameColor: string;
        color: string;
        images: string[];
      },
    ];
    describe: string | null;
    price: number[];
    variation: string[];
    product: {
      id: number;
      name: string;
      imageUrl: string;
    };
  };
};

export const getCartDetails = (data: CartDto) => {
  const items = data?.CartItem?.map((item) => ({
    id: item?.id,
    quanity: item?.quanity,
    cartId: item?.cartId,
    variations: item?.variations,
    variationItemId: item?.variationsItemId,
    selectedColor: item?.selectedColor,
    selectedVariation: item.selectedVariation,
  }));

  return {
    items,
    totalAmount: data?.totalAmount || 0,
  };
};
