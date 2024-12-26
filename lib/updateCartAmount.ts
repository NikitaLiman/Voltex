import { prisma } from '../prisma/prisma-client';
import { CalcCart } from './cartCalc';

export const updateCartTotalAmount = async (token: string) => {
  console.log(token, 'token');
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      CartItem: {
        orderBy: {
          createdAT: 'desc',
        },
        include: {
          variations: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!userCart) {
    return;
  }

  const totalAmount = userCart.CartItem.reduce((acc, item) => {
    return acc + CalcCart(item, userCart.CartItem[0].selectedVariation || 0);
  }, 0);

  await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      CartItem: {
        orderBy: {
          createdAT: 'desc',
        },
        include: {
          variations: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return userCart;
};
