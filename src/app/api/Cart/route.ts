import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { updateCartTotalAmount } from '../../../../lib/updateCartAmount';
import { FindOrCreate } from '../../../../lib/findOrCreate';

export interface GetCartItems {
  variationsItemId: number;
  selectedColor?: number;
  selectedVariation?: number;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    console.log('Token from cookies:', token);

    if (!token) {
      return NextResponse.json({ totalAmout: 0, items: [] });
    }
    const userCart = await prisma.cart.findFirst({
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
      return NextResponse.json({ totalAmout: 0, items: [] });
    }
    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server Error', error);
    console.log(error);
    return NextResponse.json({ message: 'Have not get Cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('token')?.value;
    console.log('Token from cookies:', token);

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await FindOrCreate(token);

    const data = (await req.json()) as GetCartItems;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        variationsItemId: data.variationsItemId,
        selectedColor: data.selectedColor,
        selectedVariation: data.selectedVariation,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quanity: findCartItem.quanity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          variationsItemId: data.variationsItemId,
          quanity: 1,
          selectedColor: data.selectedColor,
          selectedVariation: data.selectedVariation,
        },
      });
    }
    const updatedCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedCart);
    resp.cookies.set('token', token);
    return resp;
  } catch (error) {
    console.log(error);
    console.error('[CART_POST] Error:', error);
    return NextResponse.json({ message: 'Cannot Create CartItem' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No Token' });
    }
    const userCart = await FindOrCreate(token);
    const cart = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
      },
    });

    const deleteAllCart = await prisma.cartItem.deleteMany({
      where: {
        cartId: cart?.cartId,
      },
    });
    if (deleteAllCart.count === 0) {
      return NextResponse.json(
        { message: 'No items found in the cart to delete' },
        { status: 404 },
      );
    }
    const updateUserCart = await updateCartTotalAmount(token);
    if (!updateUserCart) {
      return NextResponse.json({ message: 'Failed to update cart total amount' }, { status: 500 });
    }
    console.log('All items removed from the cart');
    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error[CART ALL DELETE]' });
  }
}
