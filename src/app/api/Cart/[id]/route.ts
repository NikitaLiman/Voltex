import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';
import { updateCartTotalAmount } from '../../../../../lib/updateCartAmount';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const param = await params;
    const id = Number(param.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Token not found' }, { status: 401 });
    }

    const data = (await req.json()) as { quanity: number };

    if (data.quanity == null) {
      return NextResponse.json({ message: 'Quantity not provided' }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.findFirst({ where: { id } });
    if (!cartItem) {
      return NextResponse.json({ message: 'Cart item not found' }, { status: 404 });
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quanity: data.quanity },
    });

    console.log('Item updated successfully:', updatedCartItem);

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.error('Error in PATCH handler:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const param = await params;
    const id = Number(param.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Cannot find Token ' });
    }

    const cartItem = await prisma.cartItem.delete({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Cannot find Token ' });
    }

    const updateUserCart = await updateCartTotalAmount(token);
    if (!updateUserCart) {
      return NextResponse.json({ message: 'Failed to update cart total amount' }, { status: 500 });
    }
    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.log(error);
    console.log('[CART_PATCH] Server Error]');
    return NextResponse.json({ message: 'Bad Attempt To Update Cart ' }, { status: 500 });
  }
}
